export default function getElementLocation(element) {
  const bounds = element.getBoundingClientRect();
  return {
    x: Math.floor(bounds.left),
    y: Math.floor(bounds.top)
  };
}
