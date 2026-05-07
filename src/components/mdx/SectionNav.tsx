'use client';

import { useEffect, useRef, useState } from 'react';
import { useSections } from '@/lib/context/sections-context';

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

// 가장 가까운 세로 스크롤 가능한 조상 요소를 찾는다.
// 레이아웃이 <main class="overflow-y-auto">인 경우 window가 아니라 main이 스크롤 컨테이너다.
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let parent: HTMLElement | null = node?.parentElement ?? null;
  while (parent) {
    const overflowY = getComputedStyle(parent).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') return parent;
    parent = parent.parentElement;
  }
  return null;
}

export function SectionNav({ sections = [] }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [isScrolling, setIsScrolling] = useState(false);
  const { registerSections } = useSections();
  const navRef = useRef<HTMLElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    registerSections(sections);
    // sections prop은 콘텐츠에서 정적으로 정의되므로 최초 1회만 등록
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sticky 상태일 때 nav가 점유하는 세로 영역 크기. 스크롤 도착 위치/active 임계선의 기준.
  const getNavBottomFromContainer = (scrollParent: HTMLElement | null): number => {
    const nav = navRef.current;
    if (!nav) return 120;
    const navRect = nav.getBoundingClientRect();
    const containerTop = scrollParent ? scrollParent.getBoundingClientRect().top : 0;
    return navRect.bottom - containerTop;
  };

  useEffect(() => {
    const firstEl = sections[0] ? document.getElementById(sections[0].id) : null;
    const scrollParent = getScrollParent(firstEl);
    const target: HTMLElement | Window = scrollParent ?? window;

    const handleScroll = () => {
      setIsScrolling(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setIsScrolling(false), 1000);

      const scrollTop = scrollParent ? scrollParent.scrollTop : window.scrollY;
      const containerTop = scrollParent ? scrollParent.getBoundingClientRect().top : 0;
      const threshold = scrollTop + getNavBottomFromContainer(scrollParent) + 8;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (!element) continue;
        const elementTop = scrollParent
          ? element.getBoundingClientRect().top - containerTop + scrollTop
          : element.offsetTop;
        if (elementTop <= threshold) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    // 초기에는 active만 계산하고 표시는 하지 않는다.
    const scrollTop = scrollParent ? scrollParent.scrollTop : window.scrollY;
    const containerTop = scrollParent ? scrollParent.getBoundingClientRect().top : 0;
    const threshold = scrollTop + getNavBottomFromContainer(scrollParent) + 8;
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i].id);
      if (!element) continue;
      const elementTop = scrollParent
        ? element.getBoundingClientRect().top - containerTop + scrollTop
        : element.offsetTop;
      if (elementTop <= threshold) {
        setActiveSection(sections[i].id);
        break;
      }
    }

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const scrollParent = getScrollParent(element);
    // sticky nav 바로 아래에 섹션이 닿도록(섹션 직전 구분선이 보이도록) 맞춤.
    const offset = getNavBottomFromContainer(scrollParent) + 8;

    if (scrollParent) {
      const containerRect = scrollParent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const top = elementRect.top - containerRect.top + scrollParent.scrollTop - offset;
      scrollParent.scrollTo({ top, behavior: 'smooth' });
    } else {
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      onMouseEnter={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsScrolling(true);
      }}
      onMouseLeave={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setIsScrolling(false), 800);
      }}
      className={`sticky top-16 z-[100] bg-[var(--bg-color)] py-3 mb-6 -mt-4 transition-opacity duration-300 ${
        isScrolling ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="grid grid-cols-5 gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              activeSection === section.id
                ? 'border border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 font-semibold'
                : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-normal hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
