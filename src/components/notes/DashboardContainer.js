import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import {
  getNotes,
  addNote,
  updateNote,
  removeNote } from '../../services/notesApi';

class DashboardContainer extends Component {

  state = { 
    noteList: null
  };

  componentDidMount() {
    getNotes()
      .then(notes => {
        this.setState({ notes });
      });
  }

  handleAdd = note => {
    return addNote(note)
      .then(added => {
        this.setState(({ notes }) => {
          return {
            notes: [...notes, added]
          };
        });
      });
  };

  handleUpdate = note => {
    return updateNote(note)
      .then(updated => {
        this.setState(({ notes }) => {
          return {
            notes: notes.map(note => note.key === updated.key ? updated : note)
          };
        });
      });
  };

  handleRemove = key => {
    return removeNote(key)
      .then(() => {
        this.setState(({ notes }) => {
          return {
            notes: notes.filter(note => note.key !== key)
          };
        });
      });
  };

  render() { 
    const { noteList } = this.state;
    return (
      <div>
        <section>
          <h3>Add a ToDo</h3>
          <NoteForm onComplete={this.handleAdd}/>
        </section>

        {noteList &&
          <section>
            <h3>ToDos</h3>
            <NoteList
              noteList={noteList}
              onUpdate={this.handleUpdate}
              onRemove={this.handleRemove}
            />
          </section>
        }
      </div>
    );
  }
}
 
export default DashboardContainer;