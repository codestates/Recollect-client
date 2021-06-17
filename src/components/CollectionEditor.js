import React from "react";

class CollectionEditor extends React.Component {
  render() {
    return (
      <div className="nav lower">
        {}
        {this.props.isEdit ? (
          <button className="editBtn" onClick={this.props.editBtnHandler}>
            <i className="fas fa-arrow-left"></i>
          </button>
        ) : (
          <button className="editBtn" onClick={this.props.editBtnHandler}>
            Edit
          </button>
        )}
      </div>
    );
  }
}

export default CollectionEditor;
