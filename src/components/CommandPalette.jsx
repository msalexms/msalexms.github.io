/**
 * CommandPalette.jsx
 *
 * Paleta de comandos (Ctrl/Cmd + K, o "/"): navegar por la web, cambiar de
 * idioma, copiar email o abrir enlaces. Incluye un comando oculto para quien lo
 * busque. Concepto "web como sistema operativo".
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

const go = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function CommandPalette() {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);
  const copyTimerRef = useRef(null);
  const general = portfolioData.general[lang];
  const nav = portfolioData.nav[lang] ?? portfolioData.nav.es;
  const social = portfolioData.social;
  const es = lang === 'es';

  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const commands = useMemo(
    () => [
      { id: 'about', g: es ? 'Ir a' : 'Go to', label: nav.about, run: go('about') },
      { id: 'experience', g: es ? 'Ir a' : 'Go to', label: nav.experience, run: go('experience') },
      { id: 'projects', g: es ? 'Ir a' : 'Go to', label: `${nav.projects} (amstech)`, run: go('projects') },
      { id: 'academic', g: es ? 'Ir a' : 'Go to', label: nav.academic, run: go('academic') },
      { id: 'education', g: es ? 'Ir a' : 'Go to', label: nav.education, run: go('education') },
      { id: 'contact', g: es ? 'Ir a' : 'Go to', label: es ? 'Contacto' : 'Contact', run: go('contact') },
      { id: 'lang', g: es ? 'Acción' : 'Action', label: es ? 'Cambiar idioma (ES / EN)' : 'Switch language (ES / EN)', run: toggleLang },
      { id: 'mailto', g: es ? 'Acción' : 'Action', label: es ? 'Escribirme un email' : 'Email me', run: () => { window.location.href = `mailto:${general.email}`; } },
      {
        id: 'copy',
        g: es ? 'Acción' : 'Action',
        label: es ? 'Copiar email' : 'Copy email',
        stayOpen: true,
        run: async () => {
          try {
            await navigator.clipboard?.writeText(general.email);
            setCopied(true);
            clearTimeout(copyTimerRef.current);
            copyTimerRef.current = setTimeout(() => {
              setCopied(false);
              setOpen(false);
            }, 700);
          } catch {
            setOpen(false);
          }
        },
      },
      { id: 'amstech', g: 'Link', label: 'amstech.dev ↗', run: () => window.open(social.amstech, '_blank', 'noopener') },
      { id: 'github', g: 'Link', label: 'GitHub ↗', run: () => window.open(social.github, '_blank', 'noopener') },
      { id: 'linkedin', g: 'Link', label: 'LinkedIn ↗', run: () => window.open(social.linkedin, '_blank', 'noopener') },
      { id: 'sudo', g: 'sudo', label: 'sudo hire alejandro', run: go('contact'), hidden: true },
    ],
    [es, nav, toggleLang, general.email, social]
  );

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return commands
      .filter((c) => (c.hidden ? s.startsWith('sudo') : true))
      .filter((c) => !s || c.label.toLowerCase().includes(s));
  }, [commands, q]);

  useEffect(() => {
    const onKey = (e) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('ams:palette', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('ams:palette', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      setQ('');
      setSel(0);
      setCopied(false);
      setTimeout(() => inputRef.current?.focus(), 30);
    } else if (prevFocusRef.current instanceof HTMLElement) {
      prevFocusRef.current.focus();
      prevFocusRef.current = null;
    }
  }, [open]);

  useEffect(() => setSel(0), [q]);

  const exec = (c) => {
    if (c.stayOpen) {
      c.run();
      return;
    }
    setOpen(false);
    setTimeout(c.run, 120);
  };

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => Math.min(list.length - 1, s + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === 'Enter' && list[sel]) {
      exec(list[sel]);
    }
  };

  const onDialogKeyDown = (e) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll(
      'input, button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-[16vh] px-4 bg-black/70 backdrop-blur-sm"
      onMouseDown={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={es ? 'Paleta de comandos' : 'Command palette'}
        onKeyDown={onDialogKeyDown}
        className="w-full max-w-xl bg-[#0a0a0a] border border-[#525252] shadow-[0_20px_60px_rgba(0,0,0,.7)] font-mono"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-[#262626]">
          <span className="text-[#6FD08C] text-sm">$</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder={es ? 'escribe un comando…' : 'type a command…'}
            className="flex-1 bg-transparent py-4 text-sm text-[#e5e5e5] placeholder-[#909090] outline-none"
          />
          <kbd className="text-[10px] text-[#909090] border border-[#262626] px-1.5 py-0.5">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-auto py-1">
          {list.length === 0 && (
            <li className="px-4 py-6 text-xs text-[#909090]">{es ? 'sin resultados' : 'no results'}</li>
          )}
          {list.map((c, i) => {
            const isCopiedItem = c.id === 'copy' && copied;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onMouseEnter={() => setSel(i)}
                  onClick={() => exec(c)}
                  className={`w-full flex items-center justify-between gap-4 px-4 py-2 text-left text-xs ${
                    i === sel ? 'bg-[#171717] text-white' : 'text-[#a3a3a3]'
                  }`}
                >
                  <span className={isCopiedItem ? 'text-[#6FD08C]' : undefined}>
                    {isCopiedItem ? (es ? '✓ Email copiado' : '✓ Email copied') : c.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#909090]">{c.g}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-4 px-4 py-2 border-t border-[#262626] text-[10px] text-[#909090]">
          <span>↑↓ {es ? 'mover' : 'move'}</span>
          <span>↵ {es ? 'ejecutar' : 'run'}</span>
          <span>/ · Ctrl K</span>
        </div>
      </div>
    </div>
  );
}
