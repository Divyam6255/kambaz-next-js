'use client';
import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        id="wd-query-parameter-a"
        className="mb-2"
        value={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
        style={{ width: '100%', marginBottom: 8, fontSize: 16, padding: 4, display: 'block' }}
      />
      <input
        id="wd-query-parameter-b"
        className="mb-2"
        value={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
        style={{ width: '100%', marginBottom: 16, fontSize: 16, padding: 4, display: 'block' }}
      />
      <a
        id="wd-query-parameter-add"
        href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
        style={{ display: 'inline-block', background: '#1976d2', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Add {a} + {b}
      </a>
      <a
        id="wd-query-parameter-subtract"
        href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
        style={{ display: 'inline-block', background: '#d32f2f', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Subtract {a} - {b}
      </a>
      <a
        id="wd-query-parameter-multiply"
        href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
        style={{ display: 'inline-block', background: '#388e3c', color: 'white', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginRight: 8, marginBottom: 8 }}
      >
        Multiply {a} * {b}
      </a>
      <a
        id="wd-query-parameter-divide"
        href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
        style={{ display: 'inline-block', background: '#fbc02d', color: 'black', borderRadius: 5, padding: '8px 16px', textDecoration: 'none', marginBottom: 8 }}
      >
        Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}
