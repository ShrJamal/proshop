import React from "react";
import PropTypes from "prop-types";

export default function Rating({ value, text, color }) {
  return (
    <div className="flex flex-row" style={{ width: "180px" }}>
      <i
        style={{ color }}
        className={` ${
          value >= 1
            ? "fas fa-star"
            : value >= 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }`}
      />
      <i
        style={{ color }}
        className={` ${
          value >= 2
            ? "fas fa-star"
            : value >= 1.5
            ? "fas fa-star-half"
            : "far fa-star"
        }`}
      />
      <i
        style={{ color }}
        className={` ${
          value >= 3
            ? "fas fa-star"
            : value >= 2.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }`}
      />
      <i
        style={{ color }}
        className={` ${
          value >= 4
            ? "fas fa-star"
            : value >= 3.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }`}
      />
      <i
        style={{ color }}
        className={`${
          value >= 5
            ? "fas fa-star"
            : value >= 4.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }`}
      />
      <span className="ml-2">{text}</span>
    </div>
  );
}

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
