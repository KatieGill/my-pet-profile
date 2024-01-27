import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError() as Error;
  return (
    <>
      <div className="container error-element">
        <h3>Uh Oh...Something went wrong!</h3>

        <div className="error-icon">
          <img src="/assets/error-element-icon.png" alt="error icon" />
        </div>
        <p>{`${error.name} ${error.message}`}</p>
        <div className="image-credits">
          <div>
            <span>Icon made by: </span>
            <a href="https://www.flaticon.com/authors/lafs" title="LAFS">
              LAFS
            </a>

            <span>from </span>
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
