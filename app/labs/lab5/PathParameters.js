'use client';
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div>
      <h3>Path Parameters</h3>
      <input
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        style={{ width: '100%', marginBottom: 8, fontSize: 16, padding: 4, display: 'block' }}
      />
      <input
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        style={{ width: '100%', marginBottom: 16, fontSize: 16, padding: 4, display: 'block' }}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
        style={{ display: 'inline-block', background: '#1976d2', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
        style={{ display: 'inline-block', background: '#d32f2f', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Subtract {a} - {b}
      </a>
      <a
        className="btn btn-success"
        id="wd-path-parameter-multiply"
        href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
        style={{ display: 'inline-block', background: '#388e3c', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-warning"
        id="wd-path-parameter-divide"
        href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
        style={{ display: 'inline-block', background: '#fbc02d', color: 'black', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginBottom: 8 }}
      >
        Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}
