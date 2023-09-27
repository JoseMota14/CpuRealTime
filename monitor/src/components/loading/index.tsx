import { Spinner } from "react-bootstrap";

export default function Loading() {
  /*useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated 2-second delay

    return () => clearTimeout(delay); // Cleanup on unmount
  }, []);*/

  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
