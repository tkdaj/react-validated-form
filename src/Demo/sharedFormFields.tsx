/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { TextField } from '@material-ui/core';
import StandardFormDemo from './StandardFormDemo';

export type DemoState = {
  standardFormData: string;
  thecheckbox: boolean;
  theradios: string;
  theradios2: string;
  input1: string;
  input2: string;
  theselect: string;
};

export function getSharedFields(this: StandardFormDemo) {
  return (
    <>
      <input
        checked={this.state.thecheckbox}
        onChange={e => this.setState({ thecheckbox: e.target.checked })}
        name="thecheckbox"
        type="checkbox"
        required
      />
      <label htmlFor="theradios">
        <input
          checked={this.state.theradios === '1'}
          onChange={e => this.setState({ theradios: e.target.value })}
          id="theradios"
          name="theradios"
          required
          type="radio"
          value="1"
        />
        <input
          checked={this.state.theradios === '2'}
          onChange={e => this.setState({ theradios: e.target.value })}
          name="theradios"
          type="radio"
          value="2"
        />
        <input
          checked={this.state.theradios === '3'}
          onChange={e => this.setState({ theradios: e.target.value })}
          name="theradios"
          type="radio"
          value="3"
        />
      </label>
      <label htmlFor="theradios2">
        <input
          onChange={e => this.setState({ theradios2: e.target.value })}
          checked={this.state.theradios2 === '1'}
          id="theradios2"
          name="theradios2"
          required
          type="radio"
          value="1"
        />
        <input
          checked={this.state.theradios2 === '2'}
          onChange={e => this.setState({ theradios2: e.target.value })}
          name="theradios2"
          required
          type="radio"
          value="2"
        />
        <input
          checked={this.state.theradios2 === '3'}
          onChange={e => this.setState({ theradios2: e.target.value })}
          name="theradios2"
          required
          type="radio"
          value="3"
        />
      </label>
      <input
        name="input1"
        value={this.state.input1}
        onChange={e => this.setState({ input1: e.target.value })}
      />
      <TextField
        name="input2"
        value={this.state.input2}
        onChange={e => this.setState({ input2: e.target.value })}
        margin="dense"
        label="Input 2"
        type="text"
        required
        inputProps={{ pattern: '\\d+' }}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="theselect">test</label>
      <select
        value={this.state.theselect}
        onChange={e => this.setState({ theselect: e.target.value })}
        onBlur={e => this.setState({ theselect: e.target.value })}
        required
        name="theselect"
        id="theselect"
      >
        <option value="">Default</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button type="submit">Submit</button>
      <button onClick={this.formRef?.current?.resetFormSubmitted} type="button">
        Reset form submitted value
      </button>
    </>
  );
}
