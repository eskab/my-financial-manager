import React, { Component } from "react";
import { action, observable } from "mobx";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ASCENDING, DESCENDING } from "../../constants";
import "./TableHeader.scss";

class TableHeader extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired
  };

  @observable sortingOptions = { field: null, direction: null };

  isSortedAscending() {
    return this.sortingOptions.direction === ASCENDING;
  }

  isSortedDescending() {
    return this.sortingOptions.direction === DESCENDING;
  }

  isSortedByField(fieldKey) {
    return this.sortingOptions.field === fieldKey;
  }

  @action.bound
  setSortingOptions(fieldKey) {
    if (this.isSortedByField(fieldKey)) {
      this.sortingOptions.direction = this.isSortedAscending() ? DESCENDING : ASCENDING;
    } else {
      this.sortingOptions = {
        field: fieldKey,
        direction: ASCENDING
      };
    }

    this.props.sort(this.sortingOptions);
  }

  render() {
    return (
      <thead className="table-header">
        <tr>
          {this.props.fields.map(field => (
            field.key ? (
              <th
                id={`sorting-${field.key}`}
                className="table-header-field sortable"
                onClick={() => this.setSortingOptions(field.key)}
              >
                {field.value}
                {this.isSortedByField(field.key) &&
                  <i
                    className={classNames(
                      "fa",
                      { "fa-caret-up": this.isSortedAscending() },
                      { "fa-caret-down": this.isSortedDescending() }
                    )}
                  />
                }
              </th>
            ) : (
              <th className="table-header-field" />
            )
          ))}
        </tr>
      </thead>
    );
  }
}

export { TableHeader };
