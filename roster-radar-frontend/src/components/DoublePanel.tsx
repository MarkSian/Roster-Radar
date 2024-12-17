
function DoublePanel() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 panel-left text-white">
          <h1>My Roster/ Other Rosters</h1>
          {/* Add your content for the left panel here */}
        </div>
        <div className="col-md-6 panel-right text-white">
          <h1>Players/Pro Rosters</h1>
          {/* Add your content for the right panel here */}
        </div>
      </div>
    </div>
  );
}

export default DoublePanel;