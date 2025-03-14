import React from 'react';

export default function Carousal() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ObjectFit:"contain !important"}}>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: 10 }}>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img src="/baner1.jpg" className="d-block w-100" alt="Banner 1" />
          </div>
          <div className="carousel-item">
            <img src="/Banner3.jpg" className="d-block w-100" alt="Banner 3" />
          </div>
          <div className="carousel-item">
            <img src="/Banner4.jpg" className="d-block w-100" alt="Banner 4" />
          </div>
          <div className="carousel-item">
            <img src="/Banner2.jpg" className="d-block w-100" alt="Banner 2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
