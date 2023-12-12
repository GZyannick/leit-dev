"use client";

// TODO ajouter la suppresion de la modal aux onDrag
import { useCallback, useEffect, useState } from "react";
import { NodeModalType } from "@/lib/types";

const NodeModal = (params: NodeModalType) => {
  const handleChange = useCallback(
    (e: Event) => {
      if (e.target != document.getElementById("node-modal")) {
        return params.setIsOpen(false);
      }
    },
    [params.isOpen],
  );

  useEffect(() => {
    if (!params.isOpen) return;

    const div = document.getElementById("node-modal");

    // position the modal on top of selected node

    if (div) {
      div.style.top =
        params.position.y - (div.getBoundingClientRect().height + 8) + "px";
      div.style.left = params.position.x + "px";
    }

    document.addEventListener("click", handleChange);
    return () => {
      document.removeEventListener("click", handleChange);
    };
  }, [params.isOpen]);

  return (
    <div
      id="node-modal"
      className={`absolute  left-5 top-5 z-10 flex items-center rounded bg-slate-600 p-2 ${
        params.isOpen ? "block" : "hidden"
      }`}
    >
      AAA
    </div>
  );
};

export default NodeModal;
