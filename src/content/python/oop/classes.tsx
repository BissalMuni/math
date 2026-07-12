import { CalcBox, SubSection, Insight } from "@/components/content/shared";

/** Ⅰ. 클래스와 객체 — §1 클래스 정의, §2 메서드와 self, §3 상속 */
export default function Classes() {
  return (
    <div className="space-y-8">
      <p className="text-muted mb-2">
        클래스는 데이터(속성)와 동작(메서드)을 묶은 <span className="font-medium">설계도</span>이고,
        객체는 그 설계도로 찍어낸 실체다. 관련된 상태와 기능을 한 덩어리로 관리할 때 쓴다.
      </p>

      <CalcBox title="■ §1. 클래스 정의와 객체 생성">
        <SubSection title="● __init__ 생성자">
          <p className="text-sm">
            <code className="px-1 bg-sidebar-bg rounded">__init__</code>은 객체가 만들어질 때 자동 호출되어 초기 속성을 설정한다. 첫 인자는 항상 <code className="px-1 bg-sidebar-bg rounded">self</code>(자기 자신)다.
          </p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`class Dog:
    def __init__(self, name, age):
        self.name = name    # 속성(instance attribute)
        self.age = age

# 객체 생성 — __init__이 자동 실행됨
d = Dog("초코", 3)
print(d.name)          # 초코
print(d.age)           # 3`}</pre>
          </div>
        </SubSection>

        <Insight>
          <code className="px-1 bg-sidebar-bg rounded">self</code>는 &quot;지금 이 객체&quot;를 가리키는 참조다. <code className="px-1 bg-sidebar-bg rounded">self.name</code>은 &quot;이 객체의 name 속성&quot;이라는 뜻.
          호출할 땐 <code className="px-1 bg-sidebar-bg rounded">Dog(&quot;초코&quot;, 3)</code>처럼 self를 직접 넘기지 않는다 — 파이썬이 자동으로 채운다.
        </Insight>
      </CalcBox>

      <CalcBox title="■ §2. 메서드와 self">
        <SubSection title="● 인스턴스 메서드">
          <p className="text-sm">클래스 안의 함수를 메서드라 한다. 첫 인자 <code className="px-1 bg-sidebar-bg rounded">self</code>를 통해 자기 속성에 접근한다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name}: 멍멍!")

d = Dog("초코")
d.bark()               # 초코: 멍멍!`}</pre>
          </div>
        </SubSection>

        <SubSection title="● __str__ — 사람이 읽는 표현">
          <p className="text-sm"><code className="px-1 bg-sidebar-bg rounded">__str__</code>을 정의하면 <code className="px-1 bg-sidebar-bg rounded">print(객체)</code> 시 원하는 형태로 출력된다.</p>
          <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto mt-2">
            <pre>{`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 5)
print(p)               # (3, 5)`}</pre>
          </div>
        </SubSection>
      </CalcBox>

      <CalcBox title="■ §3. 상속">
        <p className="text-sm mb-2">기존 클래스의 속성·메서드를 물려받아 확장한다. 공통 기능은 부모에, 특화 기능은 자식에 둔다.</p>
        <div className="font-mono text-sm bg-sidebar-bg border border-sidebar-border rounded-lg p-4 overflow-x-auto">
          <pre>{`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name}이(가) 소리를 낸다")

class Cat(Animal):        # Animal을 상속
    def speak(self):      # 메서드 재정의(override)
        print(f"{self.name}: 야옹")

class Cow(Animal):
    pass                  # 부모 메서드 그대로 사용

Cat("나비").speak()       # 나비: 야옹
Cow("얼룩이").speak()      # 얼룩이이(가) 소리를 낸다`}</pre>
        </div>
        <Insight>
          자식에서 부모의 <code className="px-1 bg-sidebar-bg rounded">__init__</code>을 확장하려면 <code className="px-1 bg-sidebar-bg rounded">super().__init__(...)</code>로 부모 초기화를 먼저 호출한다.
          상속은 &quot;A는 B의 일종이다(is-a)&quot; 관계일 때 알맞다 — 고양이는 동물의 일종이다.
        </Insight>
      </CalcBox>
    </div>
  );
}
