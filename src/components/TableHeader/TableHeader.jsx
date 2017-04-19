import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TableHeader.scss";

class TableHeader extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired
  };

  sortBy;
  sortDirection;

  setSortingOptions = ({ target }) => {
    const key = target.id.replace("sorting-", "");

    if (this.sortBy) {
      if (this.sortBy === key) {
        this.sortDirection = this.sortDirection === "ASC" ? "DSC" : "ASC";
      } else {
        this.sortBy = key;
        this.sortDirection = "ASC";
      }
    } else {
      this.sortBy = key;
      this.sortDirection = "ASC";
    }

    this.props.sort(this.sortDirection, this.sortBy);
  }

  render() {
    const { fields } = this.props;

    return (
      <thead className="table-header">
        <tr>
          {fields.map(field =>
            <th
              id={`sorting-${field.value.toLowerCase()}`}
              className="table-header-field"
              onClick={this.setSortingOptions}
            >
              {field.value}
            </th>
          )}
        </tr>
      </thead>
    );
  }
}

export { TableHeader };
