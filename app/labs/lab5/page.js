import PathParameters from './PathParameters';
import QueryParameters from './QueryParameters';
import WorkingWithObjects from './WorkingWithObjects';
import WorkingWithArrays from './WorkingWithArrays';
import HttpClient from './HttpClient.js';
import WorkingWithObjectsAsynchronously from './WorkingWithObjectsAsynchronously.js';
import WorkingWithArraysAsynchronously from './WorkingWithArraysAsynchronously.js';

export default function Lab5() {
  return (
    <div style={{ maxWidth: 600, margin: '32px 0', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lab 5</h1>
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
