import { useEffect, useRef, useState } from 'react';
import { getToolCategories } from './data/queries';
import './App.css';

const TRANSITION_MS = 420;
const STORAGE_KEY = 'checkedTools';

function loadCheckedTools() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return new Set();
    const parsed = JSON.parse(stored);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const categories = getToolCategories();
  const nodeRefs = useRef([]);
  const [view, setView] = useState({ index: null, phase: 'closed', rect: null });
  const [checkedTools, setCheckedTools] = useState(loadCheckedTools);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checkedTools]));
    } catch {
      // ignore write errors (e.g. storage full or unavailable)
    }
  }, [checkedTools]);

  const toggleTool = (key) => {
    setCheckedTools((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const openNode = (index) => {
    const el = nodeRefs.current[index];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setView({ index, phase: 'opening', rect });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setView((v) => ({ ...v, phase: 'open' }));
      });
    });
  };

  const closeNode = () => {
    setView((v) => ({ ...v, phase: 'closing' }));
    setTimeout(() => {
      setView({ index: null, phase: 'closed', rect: null });
    }, TRANSITION_MS);
  };

  useEffect(() => {
    if (view.index === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeNode();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [view.index]);

  const activeCategory = view.index !== null ? categories[view.index] : null;

  const isExpanded = view.phase === 'open';
  const overlayStyle =
    isExpanded
      ? { top: 0, left: 0, width: '100vw', height: '100vh' }
      : view.rect
      ? {
          top: view.rect.top,
          left: view.rect.left,
          width: view.rect.width,
          height: view.rect.height,
        }
      : null;

  return (
    <div className="page">
      <p className="eyebrow">I — Tooling</p>
      <h1 className="hero-title">
        Claude Code, <em className="hero-em">in pieces.</em>
      </h1>
      <p className="hero-lead">
        Every LLM tool available in Claude Code (the ones your agent will use)
      </p>

      <hr className="rule" />

      <div className="node-grid">
        {categories.map((cat, i) => {
          const checkedCount = cat.tools.reduce(
            (n, tool) => n + (checkedTools.has(`${cat.category}::${tool.name}`) ? 1 : 0),
            0
          );
          const exampleStepCount = cat.example?.steps.length ?? 0;
          const checkedExampleStepCount = cat.example
            ? cat.example.steps.reduce(
                (n, _, si) => n + (checkedTools.has(`${cat.category}::example::${si}`) ? 1 : 0),
                0
              )
            : 0;
          const totalCount = cat.tools.length + exampleStepCount;
          const percent = totalCount
            ? Math.round(((checkedCount + checkedExampleStepCount) / totalCount) * 100)
            : 0;
          const isFinished = percent === 100;
          return (
            <button
              key={cat.category}
              ref={(el) => (nodeRefs.current[i] = el)}
              className={`node${isFinished ? ' node--finished' : ''}`}
              onClick={() => openNode(i)}
              style={{ visibility: view.index === i && view.phase !== 'closed' ? 'hidden' : 'visible' }}
            >
              <span className="node-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="node-title">{cat.category}</h3>
              <p className="node-meta">{cat.tools.length} tools</p>
              <span className="node-percent">{percent}%</span>
              <span className="node-arrow">→</span>
            </button>
          );
        })}
      </div>

      {view.index !== null && overlayStyle && (
        <div
          className={`overlay${isExpanded ? ' overlay--open' : ''}`}
          style={overlayStyle}
        >
          <div className="overlay-content">
            <div className="overlay-inner">
              <button className="overlay-back" onClick={closeNode}>
                ← Back
              </button>
              <p className="overlay-eyebrow">{String(view.index + 1).padStart(2, '0')}</p>
              <h2 className="overlay-title">{activeCategory?.category}</h2>
              <div className="tool-list">
                {activeCategory?.tools.map((tool) => {
                  const key = `${activeCategory.category}::${tool.name}`;
                  const isChecked = checkedTools.has(key);
                  return (
                    <label
                      className={`tool-row${isChecked ? ' tool-row--checked' : ''}`}
                      key={tool.name}
                    >
                      <input
                        type="checkbox"
                        className="tool-checkbox"
                        checked={checkedTools.has(key)}
                        onChange={() => toggleTool(key)}
                      />
                      <p className="tool-name">{tool.name}</p>
                      <p className="tool-description">{tool.description}</p>
                    </label>
                  );
                })}
              </div>

              {activeCategory?.example && (
                <div className="example">
                  <div className="example-heading">
                    <h3 className="example-title">{activeCategory.example.title}</h3>
                    <span className="example-flag" title="Run Claude with this flag to watch each tool call as it happens">
                      claude --verbose
                    </span>
                  </div>
                  {activeCategory.example.note && (
                    <p className="example-note">{activeCategory.example.note}</p>
                  )}
                  <ol className="example-steps">
                    {activeCategory.example.steps.map((step, si) => {
                      const stepKey = `${activeCategory.category}::example::${si}`;
                      const stepChecked = checkedTools.has(stepKey);
                      return (
                        <li className="example-step" key={si}>
                          <label
                            className={`example-step-row${
                              stepChecked ? ' example-step-row--checked' : ''
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="tool-checkbox"
                              checked={stepChecked}
                              onChange={() => toggleTool(stepKey)}
                            />
                            <span className="example-step-text">
                              {step.text}
                              {step.link && (
                                <>
                                  {' '}
                                  <a
                                    className="example-link"
                                    href={step.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {step.link}
                                  </a>
                                </>
                              )}
                            </span>
                          </label>
                          {step.code && <pre className="example-code">{step.code}</pre>}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
