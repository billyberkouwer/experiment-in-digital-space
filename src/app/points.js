import Dots from "./dot";

export default function Points({mousePositions}) {
    return (
        mousePositions.map((el, i) => {
            if (mousePositions.length - i <= 300) {
              return (
                <Dots
                  key={"dot " + i}
                  mouseX={el.x}
                  mouseY={el.y}
                  opacity={i / mousePositions.length}
                />
              );
            }
        })
    )
}