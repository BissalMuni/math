import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅲ. case와 분기 — §1 case 구조, §2 패턴, §3 실전 (인자 파싱) */
export default function BashCase() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        <code className="px-1 bg-sidebar-bg rounded">case</code>는 하나의 값을 <span className="font-medium">여러 패턴과 차례로 비교</span>하는 분기문이다.
        <code className="px-1 bg-sidebar-bg rounded">if-elif</code>가 길어질 때 훨씬 읽기 좋다.
      </p>

      <CalcBox title="■ §1. case 기본 구조">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`case "$1" in
    start)
        echo "시작합니다"
        ;;
    stop)
        echo "중지합니다"
        ;;
    *)
        echo "알 수 없는 명령: $1"
        ;;
esac`}</pre>
        </div>
        <p className="text-sm mt-2">
          각 분기는 <code className="px-1 bg-sidebar-bg rounded">패턴)</code>으로 시작하고 <code className="px-1 bg-sidebar-bg rounded">;;</code>로 끝난다.
          <code className="px-1 bg-sidebar-bg rounded">*)</code>는 <span className="font-medium">어디에도 안 맞을 때</span>의 기본 분기다. 첫 번째로 매칭된 패턴만 실행된다.
        </p>
      </CalcBox>

      <CalcBox title="■ §2. 패턴 매칭">
        <p className="text-sm mb-2">
          <code className="px-1 bg-sidebar-bg rounded">case</code>의 패턴은 정규식이 아니라 <span className="font-medium">글로브(glob) 패턴</span>이다.
        </p>

        <SubSection title="● 글로브 문자">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`case "$file" in
    *.txt)      echo "텍스트 파일" ;;
    *.jpg|*.png) echo "이미지 파일" ;;   # | 로 여러 패턴 OR
    img_?)      echo "img_ + 한 글자" ;; # ? 는 임의의 한 글자
    [0-9]*)     echo "숫자로 시작" ;;    # 문자 집합
    *)          echo "기타" ;;
esac`}</pre>
          </div>
          <p className="text-sm mt-2">
            <code className="px-1 bg-sidebar-bg rounded">*</code>(임의 문자열), <code className="px-1 bg-sidebar-bg rounded">?</code>(한 글자), <code className="px-1 bg-sidebar-bg rounded">[...]</code>(문자 집합), <code className="px-1 bg-sidebar-bg rounded">|</code>(OR)를 조합한다.
          </p>
        </SubSection>

        <SubSection title="● 대소문자 무시">
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`case "$answer" in
    [Yy]|[Yy][Ee][Ss]) echo "예" ;;   # y, Y, yes, YES ...
    [Nn]|[Nn][Oo])     echo "아니오" ;;
esac`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 실전 — 명령 디스패처">
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
          <pre>{`#!/usr/bin/env bash
# 사용법: ./svc.sh {start|stop|restart|status}

case "$1" in
    start)   systemctl start myapp ;;
    stop)    systemctl stop myapp ;;
    restart) systemctl restart myapp ;;
    status)  systemctl status myapp ;;
    *)
        echo "사용법: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac`}</pre>
        </div>
        <p className="text-sm mt-2">
          서비스 관리 스크립트의 전형적인 형태다. 인자에 따라 다른 동작을 하고, 잘못된 인자에는 사용법을 안내하며 <code className="px-1 bg-sidebar-bg rounded">exit 1</code>로 실패를 알린다.
        </p>

        <Insight>
          같은 값을 <span className="font-medium">3개 이상의 경우로 분기</span>한다면 <code className="px-1 bg-sidebar-bg rounded">if-elif</code>보다 <code className="px-1 bg-sidebar-bg rounded">case</code>가 명확하다. 패턴은 정규식이 아닌 <span className="font-medium">글로브</span>임을 기억하자 — <code className="px-1 bg-sidebar-bg rounded">.</code>은 그냥 점, <code className="px-1 bg-sidebar-bg rounded">*</code>는 &quot;아무거나&quot;.
        </Insight>
      </CalcBox>
    </div>
  );
}
