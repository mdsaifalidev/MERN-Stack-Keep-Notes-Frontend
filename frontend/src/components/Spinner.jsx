const Spinner = () => {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 w-100 bg-light position-fixed bg-opacity-75 z-1">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
