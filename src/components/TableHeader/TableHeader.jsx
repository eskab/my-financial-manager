import React, { Component } from "react";
import { action, observable } from "mobx";
import PropTypes from "prop-types";
import { ASCENDING, DESCENDING } from "../../constants";
import "./TableHeader.scss";

class TableHeader extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired
  };

  @observable sortBy;
  @observable sortDirection;

  @action.bound
  setSortingOptions(field) {
    const key = field.toLowerCase();

    if (this.sortBy) {
      if (this.sortBy === key) {
        this.sortDirection = this.sortDirection === ASCENDING ? DESCENDING : ASCENDING;
      } else {
        this.sortBy = key;
        this.sortDirection = ASCENDING;
      }
    } else {
      this.sortBy = key;
      this.sortDirection = ASCENDING;
    }

    this.props.sort(this.sortDirection, this.sortBy);
  }

  render() {
    const { fields } = this.props;

    return (
      <thead className="table-header">
        <tr>
          {fields.map(field => (
            field.value ?
              <th
                id={`sorting-${field.value.toLowerCase()}`}
                className="table-header-field sortable"
                onClick={() => this.setSortingOptions(field.value)}
              >
                {field.value}
                {this.sortBy === field.value.toLowerCase() &&
                (this.sortDirection === ASCENDING
                  ? <i className="fa fa-caret-up" />
                  : <i className="fa fa-caret-down" />)
                }
              </th> :
              <th className="table-header-field" />
          ))}
        </tr>
      </thead>
    );
  }
}

export { TableHeader };
