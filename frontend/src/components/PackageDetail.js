import React from 'react';
import './PackageDetail.css';

const PackageDetail = ({ packageDetail, navigateTo }) => {
  if (!packageDetail) {
    return <div>Package not found</div>;
  }

  return (
    <div className="package-detail">
      <h1>{packageDetail.name}</h1>
      <img src={packageDetail.image} alt={packageDetail.name} />
      <p>{packageDetail.description}</p>
      <p>Duration: {packageDetail.duration} days</p>
      <p>Destination: {packageDetail.destination}</p>
      <p>Price: Tk{packageDetail.price}</p>
      <button onClick={() => navigateTo('holiday')}>Back to Packages</button>
    </div>
  );
};

export default PackageDetail;
