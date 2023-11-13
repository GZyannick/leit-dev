import Container from "@/components/general/container";
import { db } from "@/lib/db";
import { Boxes } from "@prisma/client";
import { InitialProfile } from "@/lib/initial-profile";

const capitalize = (str: String) => {
  const str2 = str.toLowerCase();
  return str2.charAt(0).toUpperCase() + str2.slice(1);
};

// const toObject = (array: []) => {
//   const object = {};
//   array.forEach((i) => {
//     object[i] = {
//       name: i.toString(),

//     }
//   })
// }

const toObject = () => {
  let newBoxesObject = {};
  let i = 0;
  let span = 1;
  for (let key in Boxes) {
    newBoxesObject[key] = {
      name: capitalize(key),
      count: 0,
      spanNumber: key == "LEARNED" ? 0 : span,
    };
    i++;
    i == 1 ? (span = span + 1) : (span = span + 2);
  }

  return newBoxesObject;
};

const LeitnerBoxes = async () => {
  const profile = InitialProfile();

  // transform the prisma client enum with additional data for the html
  const boxObject = toObject();
  const lboxes = await db.lcard.findMany({
    where: {
      profileId: profile.id,
    },
  });

  lboxes.forEach((lbox) => {
    if (boxObject.hasOwnProperty(lbox.box)) boxObject[lbox.box].count++;
  });

  return (
    <Container>
      <div className="grid grid-cols-2 gap-4">
        {/* {Object.values(Boxes).map((box, idx) => (
          <div key={idx + box}>
            <p>{capitalize(box)}</p>
            <div className="flex items-center">
              <span className="inline-block content-none	"></span>
            </div>
          </div>
        ))} */}
      </div>
    </Container>
  );
};

export default LeitnerBoxes;
