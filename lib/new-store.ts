"use client";

// enregistrer le changement de position des nodes

import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  Background,
} from "reactflow";

import {
  GetMindmapNodeAndEdge,
  CreateMany,
  UpdateMany,
  DeleteMany,
} from "@/app/mindmap/[id]/actions";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  toCreateNodes: Node[];
  toUpdateNodes: Node[];
  toDeleteNodes: Node[];
  stroke: string;
  background: string;
  mindMapId: string;
  currentNodeId: string;
  mindMapName: string;
  color: string;
  fontSize: string;
  id: number;
  positionBuffer: { x: number; y: number };
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateContentValue: (params: { value: string; nodeId: string }) => void;
  updateMindmapName: (event: string) => void;
  addToCrudArrays: (changes: NodeChange[]) => void;
};

import { createWithEqualityFn } from "zustand/traditional";
import { MutableRefObject } from "react";

const useMindmapStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  toCreateNodes: [],
  toUpdateNodes: [],
  toDeleteNodes: [],
  mindMapId: "",
  mindMapName: "",
  currentNodeId: "",
  stroke: "#000000",
  fontSize: "1rem",
  color: "#023047",
  background: "#4C5760",
  id: 0,
  // Possible erreur de code avec le Buffer sur la position des node
  positionBuffer: { x: 0, y: 0 },

  // ___________________ NOUVELLE IDEE ___________________ //

  // faire 3 tableau nomées :
  // ToCreateNode[]
  // ToUpdateNode[]
  // ToDeleteNode[]

  // Cela me permettera de tracker chaque changement dans
  //  onDrop
  //  onNodesChanges
  //  onNodeDelete .....

  // a savoir qu'il faudra verifier si la node actuelle nest pas
  // dans ToCreateNode avant de l'ajouter dans ToUpdateNode[] ou ToDeleteNode car cela est pour le backend
  // est les nodes actuelle dans toCreateNode ne sont pas encore dans le backend

  // PS TO IMPLEMENT le fait de gerer les Edge
  //

  addToCrudArrays: (changes: NodeChange[]) => {
    // pour toDeleteNode on regarde si elle est dans toCreate ou toUpdate
    // si dans toCreate on supprime juste
    // si dans toUpdate on enleve de toUpdate est ajoute a toDelete
    // sinon ajouter dnas toDelete
    // Check if change Node is in toUpdate or toCreate
    //
    //
    //
    const isFoundInToCreate = get().toCreateNodes.some((node) =>
      node.id === changes[0].id ? true : false,
    );
    const isFoundInToUpdate = get().toUpdateNodes.some((node) =>
      node.id === changes[0].id ? true : false,
    );

    if (changes[0].type === "remove") {
      if (isFoundInToCreate) {
        const toFilter = [...get().toCreateNodes];
        const FilteredToCreateNodes = toFilter.filter(
          (node) => node.id !== changes[0].id,
        );
        set({
          toCreateNodes: [...FilteredToCreateNodes],
        });
      } else if (isFoundInToUpdate) {
        const toFilter = [...get().toUpdateNodes];
        const removedValue = toFilter.find((node) => node.id === changes[0].id);
        const FilteredToUpdateNodes = toFilter.filter(
          (node) => node.id !== changes[0].id,
        );
        if (!removedValue) return;
        set({
          toUpdateNodes: [...FilteredToUpdateNodes],
          toDeleteNodes: [...get().toDeleteNodes, removedValue],
        });
      }
    }

    if (isFoundInToCreate) {
      // if is in toCreate change in this array
      // if its not in toCreate we check in toUpdate if its true change in this array
      // else we add it to toUpdate by retrieving from nodes because NodeChange didnt have all the information of a Node
      set({
        toCreateNodes: applyNodeChanges(changes, get().toCreateNodes),
      });
    } else if (isFoundInToUpdate) {
      set({
        toUpdateNodes: applyNodeChanges(changes, get().toUpdateNodes),
      });
    } else if (isFoundInToCreate === false && isFoundInToUpdate === false) {
      const currentNodeToUpdate = get().nodes.find(
        (node) => node.id === changes[0].id,
      );

      if (!currentNodeToUpdate) return;
      set({
        toUpdateNodes: [...get().toUpdateNodes, currentNodeToUpdate],
      });
    }
  },

  // ___________________ NOUVELLE IDEE ___________________ //

  onNodesChange: (changes: NodeChange[]) => {
    if (changes[0].dragging === true) {
      set({
        positionBuffer: changes[0].position,
      });
    }
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });

    // peut etre a mettre dans dragging === false pour reduire lapelle du forEach
    //
    get().addToCrudArrays(changes);
  },

  setCurrentNodeId: (id: string) => {
    if (!id) return;
    set({
      currentNodeId: id,
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  //onDrop allow to create new Node
  onDrop: (
    event: any,
    reactFlowWrapper: MutableRefObject<HTMLDivElement>,
    reactFlowInstance: ReactFlowInstance,
  ) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    let type = event.dataTransfer.getData("application/reactflow");
    if (!type) type = "mindMap";
    if (!reactFlowInstance) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: `node-${get().id}`,
      type,
      position,
      data: {
        label: `${type} node ${get().id}`,
        style: {
          color: get().color,
          background: get().background,
          fontSize: get().fontSize,
        },
      },
    };
    set({
      id: get().id + 1,
      nodes: [...get().nodes, newNode],
      // _______ NEW METHOD _______ //
      toCreateNodes: [...get().toCreateNodes, newNode],
      // _______ NEW METHOD _______ //
    });
  },

  // onConnect allow to create Edge
  onConnect: async (connection: any) => {
    connection.animated = false;
    connection.style = {
      stroke: get().stroke,
      strokeWidth: 2,
    };
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  updateSpecificNodeStyle: (value: string, type: string) => {
    const nodeId = get().currentNodeId;
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            style: {
              color: type === "text" ? value : node.data.style.color,
              fontSize: type === "fs" ? value + "px" : node.data.style.fontSize,
              background: type === "bg" ? value : node.data.style.background,
            },
          };
        }
        return node;
      }),
    });
  },

  updateGlobalStyle: (value: string, type: string) => {
    switch (type) {
      case "fs":
        set({ fontSize: value + "px" });
        break;
      case "text":
        set({ color: value });
        break;
      case "bg":
        set({ background: value });
        break;
      case "stroke":
        set({ stroke: value });
    }
  },

  updateContentValue: (params: { value: string; nodeId: string }) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === params.nodeId) {
          node.data.value = params.value;
        }
        return node;
      }),
    });
  },

  updateMindmapName: (event: string) => {
    if (get().mindMapName === event) return;
    set({
      mindMapName: event,
    });
  },

  // updateData: async () => {
  //   const res = await GetMindmapNodeAndEdge(get().mindMapId);

  //   const modifiedNodes: Node[] = [];
  //   const modifiedEdges = [];

  //   if (!res) return;
  //   const currentNode = [...get().nodes];
  //   const currentEdge = [...get().edges];

  //   // has to be changed because  if user have deleted all the nodes by himself
  //   // if(currentNode.length === 0 ) return;
  //   // if(currentNode.length > res.nodes.length){
  //   //   console.log("currentNode > res.nodes")
  //   // }

  //   // je dois checker chaque nodes si il y a une difference entre chaque value de la database
  //   // si un id de node viens detre creer il contient "node-"
  //   // si un id de edge viens detre creer il contient "reactflow__edge-"
  //   //

  //   // Valeur a check pour chaque node
  //   // edges

  //   //background, color, fontSize, xPos, yPos, value

  //   // peut etre deplacer directement tout ça dans le backend

  //   // const id = await createNode({
  //   //   label: `${type} node ${get().id}`,
  //   //   value: "",
  //   //   background: get().background,
  //   //   color: get().color,
  //   //   fontSize: get().fontSize,
  //   //   xPos: position.x,
  //   //   yPos: position.y,
  //   //   type,
  //   //   mindMapId: get().mindMapId,
  //   // });

  //   currentNode.forEach((node) => {
  //     if (node.id.includes("node-")) createNode(node, res.id);
  //     res.nodes.forEach((resNode) => {
  //       if (node.id !== resNode.id) return;
  //       const style = node.data.style;
  //       const position = node.position;
  //       if (
  //         style.background !== resNode.background ||
  //         style.color !== resNode.color ||
  //         style.fontSize !== resNode.fontSize ||
  //         node.data.value !== resNode.value ||
  //         position.x !== resNode.xPos ||
  //         position.y !== resNode.yPos
  //       ) {
  //         // updateNode(node);
  //       }
  //     });
  //   });
  //   // if (modifiedNodes.length > 0 || modifiedEdges.length > 0)
  //   //   CreateOrUpdate(modifiedNodes, res.id);
  // },
  //
  updateData: async () => {
    const toUpdate = get().toUpdateNodes;
    const toCreate = get().toCreateNodes;
    const toDelete = get().toDeleteNodes;
    const mindMapId = get().mindMapId;
    if (toUpdate.length === 0 && toCreate.length === 0 && toDelete.length === 0)
      return false;

    if (toCreate.length > 0) await CreateMany(toCreate, mindMapId);
    if (toUpdate.length > 0) await UpdateMany(toUpdate, mindMapId);
    if (toDelete.length > 0) await DeleteMany(toDelete, mindMapId);
    set({
      toCreateNodes: [],
      toUpdateNodes: [],
      toDeleteNodes: [],
    });

    return true;
  },
}));

export default useMindmapStore;

// Mindmap Name
// Node
// Edge

// Check if Node or Edge still exist in front//
// check if node or edge Style / value still the same

// add absolute position in database ?

// ----------- Look of what looks like a node object in reactflow ----------- //
// [
//     {
//         "id": "node-0",
//         "type": "background",
//         "position": {
//             "x": 850.1672573802939,
//             "y": 54.95085921714296
//         },
//         "data": {
//             "label": "background node 0",
//             "style": {
//                 "color": "#023047",
//                 "background": "#4C5760",
//                 "fontSize": "1rem"
//             }
//         },
//         "width": 109,
//         "height": 40,
//         "selected": true,
//         "positionAbsolute": {
//             "x": 850.1672573802939,
//             "y": 54.95085921714296
//         },
//         "dragging": false
//     }
// ]

// WHAT LOOKS LIKE IN DATABASE
// {
//     "id": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//     "name": "This is a ",
//     "profileId": "2d8d3891-7bbc-47da-b1d7-5704a9610d74",
//     "imageUrl": "https://res.cloudinary.com/dcujfv4xb/image/upload/v1702394923/jgr7f69nagjbhmtutxzu.png",
//     "imagePublicId": "jgr7f69nagjbhmtutxzu",
//     "createdAt": "2023-10-18T13:36:52.718Z",
//     "updatedAt": "2023-12-12T15:28:43.451Z",
//     "nodes": [
//         {
//             "id": "fa38b2c2-c684-432e-9e40-8cd4c7f22b6b",
//             "label": "background node 0",
//             "value": "ZZZZZZdsqdqs this is test",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 1427,
//             "yPos": 20,
//             "type": "background",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:24:49.286Z",
//             "updatedAt": "2023-12-12T16:29:38.299Z",
//             "edges": [
//                 {
//                     "id": 44,
//                     "edgeId": 22,
//                     "nodeId": "fa38b2c2-c684-432e-9e40-8cd4c7f22b6b",
//                     "handle": "d",
//                     "createdAt": "2023-12-12T16:29:19.253Z",
//                     "updatedAt": "2023-12-12T16:29:19.253Z"
//                 }
//             ]
//         },
//         {
//             "id": "be334cdb-140f-460d-ad3e-74beaf86fbc4",
//             "label": "mindMap node 0",
//             "value": "BEBEBEBEB",
//             "background": "#4C5760",
//             "color": "#c7c7c7",
//             "fontSize": "1rem",
//             "xPos": 198,
//             "yPos": -1116,
//             "type": "mindMap",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:53:28.032Z",
//             "updatedAt": "2023-12-12T16:32:14.611Z",
//             "edges": [
//                 {
//                     "id": 42,
//                     "edgeId": 21,
//                     "nodeId": "be334cdb-140f-460d-ad3e-74beaf86fbc4",
//                     "handle": "a",
//                     "createdAt": "2023-12-12T15:28:32.883Z",
//                     "updatedAt": "2023-12-12T15:28:32.883Z"
//                 }
//             ]
//         },
//         {
//             "id": "1b0684d1-5dbc-4450-b23b-cff90da61f07",
//             "label": "background node 0",
//             "value": "fdfdfdfdfd",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 15,
//             "yPos": -342,
//             "type": "background",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:52:16.882Z",
//             "updatedAt": "2023-12-12T15:04:13.552Z",
//             "edges": []
//         },
//         {
//             "id": "29e301a1-4cb5-4c4b-bd7b-10229552fc1a",
//             "label": "mindMap node 0",
//             "value": "sqdqs",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 1178,
//             "yPos": -1065,
//             "type": "mindMap",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:29:17.572Z",
//             "updatedAt": "2023-12-06T17:05:46.699Z",
//             "edges": []
//         },
//         {
//             "id": "cb0df585-4e8b-4400-b5cb-8d6afbc134a6",
//             "label": "mindMap node 0",
//             "value": "kjnkjnkjnkjn",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 1592,
//             "yPos": -440,
//             "type": "mindMap",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:27:43.226Z",
//             "updatedAt": "2023-12-12T16:28:21.514Z",
//             "edges": [
//                 {
//                     "id": 29,
//                     "edgeId": 15,
//                     "nodeId": "cb0df585-4e8b-4400-b5cb-8d6afbc134a6",
//                     "handle": "b",
//                     "createdAt": "2023-12-06T15:45:29.155Z",
//                     "updatedAt": "2023-12-06T15:45:29.155Z"
//                 },
//                 {
//                     "id": 32,
//                     "edgeId": 16,
//                     "nodeId": "cb0df585-4e8b-4400-b5cb-8d6afbc134a6",
//                     "handle": "a",
//                     "createdAt": "2023-12-06T15:50:44.075Z",
//                     "updatedAt": "2023-12-06T15:50:44.075Z"
//                 },
//                 {
//                     "id": 39,
//                     "edgeId": 20,
//                     "nodeId": "cb0df585-4e8b-4400-b5cb-8d6afbc134a6",
//                     "handle": "b",
//                     "createdAt": "2023-12-08T12:59:48.968Z",
//                     "updatedAt": "2023-12-08T12:59:48.968Z"
//                 }
//             ]
//         },
//         {
//             "id": "dbc2c185-14fe-4220-8b80-39a9dcd13958",
//             "label": "mindMap node 0",
//             "value": "This is my mindmap",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 1592,
//             "yPos": -440,
//             "type": "mindMap",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-12-06T15:50:25.930Z",
//             "updatedAt": "2023-12-12T16:28:22.798Z",
//             "edges": [
//                 {
//                     "id": 31,
//                     "edgeId": 16,
//                     "nodeId": "dbc2c185-14fe-4220-8b80-39a9dcd13958",
//                     "handle": "b",
//                     "createdAt": "2023-12-06T15:50:44.075Z",
//                     "updatedAt": "2023-12-06T15:50:44.075Z"
//                 },
//                 {
//                     "id": 43,
//                     "edgeId": 22,
//                     "nodeId": "dbc2c185-14fe-4220-8b80-39a9dcd13958",
//                     "handle": "a",
//                     "createdAt": "2023-12-12T16:29:19.253Z",
//                     "updatedAt": "2023-12-12T16:29:19.253Z"
//                 }
//             ]
//         },
//         {
//             "id": "e51989c5-5c8b-47c8-8260-55a9fbbfb99d",
//             "label": "background node 0",
//             "value": "",
//             "background": "#4C5760",
//             "color": "#023047",
//             "fontSize": "1rem",
//             "xPos": 0,
//             "yPos": 0,
//             "type": "background",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-11-15T15:02:21.532Z",
//             "updatedAt": "2023-12-12T15:26:29.312Z",
//             "edges": [
//                 {
//                     "id": 28,
//                     "edgeId": 14,
//                     "nodeId": "e51989c5-5c8b-47c8-8260-55a9fbbfb99d",
//                     "handle": "c",
//                     "createdAt": "2023-12-06T15:28:40.553Z",
//                     "updatedAt": "2023-12-06T15:28:40.553Z"
//                 },
//                 {
//                     "id": 30,
//                     "edgeId": 15,
//                     "nodeId": "e51989c5-5c8b-47c8-8260-55a9fbbfb99d",
//                     "handle": "d",
//                     "createdAt": "2023-12-06T15:45:29.155Z",
//                     "updatedAt": "2023-12-06T15:45:29.155Z"
//                 }
//             ]
//         },
//         {
//             "id": "549e9d8a-d14d-46be-bd7e-68a79df0fc46",
//             "label": "mindMap node 3",
//             "value": "Test 2fdfqsfqsfqdsqsfqsd",
//             "background": "#4C5760",
//             "color": "#cbc8c8",
//             "fontSize": "1rem",
//             "xPos": 0,
//             "yPos": 0,
//             "type": "mindMap",
//             "mindMapId": "6d28a91e-c086-449c-8f22-76117e70ae7c",
//             "createdAt": "2023-10-31T15:57:59.077Z",
//             "updatedAt": "2023-12-13T14:39:22.334Z",
//             "edges": [
//                 {
//                     "id": 40,
//                     "edgeId": 20,
//                     "nodeId": "549e9d8a-d14d-46be-bd7e-68a79df0fc46",
//                     "handle": "a",
//                     "createdAt": "2023-12-08T12:59:48.968Z",
//                     "updatedAt": "2023-12-08T12:59:48.968Z"
//                 },
//                 {
//                     "id": 41,
//                     "edgeId": 21,
//                     "nodeId": "549e9d8a-d14d-46be-bd7e-68a79df0fc46",
//                     "handle": "b",
//                     "createdAt": "2023-12-12T15:28:32.883Z",
//                     "updatedAt": "2023-12-12T15:28:32.883Z"
//                 }
//             ]
//         }
//     ]
// }
