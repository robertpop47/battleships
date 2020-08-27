export const MOUSE_ENTER = "MOUSE_ENTER";
export const MOUSE_LEAVE = "MOUSE_LEAVE";

export const mouseEnter = (cellIndex) => {
  cellIndex = parseInt(cellIndex);
  return {
    type: MOUSE_ENTER,
    coordinates: [parseInt(cellIndex / 10), cellIndex % 10],
  };
};

export const mouseLeave = (cellIndex) => {
  cellIndex = parseInt(cellIndex);
  return {
    type: MOUSE_LEAVE,
    coordinates: [parseInt(cellIndex / 10), cellIndex % 10],
  };
};
