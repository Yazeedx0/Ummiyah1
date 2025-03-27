CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  grade_id INTEGER REFERENCES grades(id)
);

CREATE TABLE units (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject_id INTEGER REFERENCES subjects(id)
);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  unit_id INTEGER REFERENCES units(id)
);

CREATE TABLE objectives (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  lesson_id INTEGER REFERENCES lessons(id)
);

-- إدخال بيانات الصف الرابع
INSERT INTO grades (name) VALUES ('الصف الرابع');

INSERT INTO subjects (name, grade_id) VALUES 
('اللغة العربية', 1), 
('العلوم', 1);

INSERT INTO units (name, subject_id) VALUES 
('الوحدة الأولى: التواصل الشفهي', 1),
('الوحدة الأولى: الكائنات الحية', 2);

INSERT INTO lessons (title, content, unit_id) VALUES 
('الدرس الأول: في المطعم', 'يتناول هذا الدرس حوارًا داخل مطعم...', 1),
('الدرس الثاني: صديقي الجديد', 'قصة تعارف بين طالبين جدد...', 1),
('الدرس الأول: خصائص الكائنات الحية', 'خصائص تميز الكائنات الحية عن الجمادات...', 2),
('الدرس الثاني: تصنيف الكائنات الحية', 'كيف نصنف الكائنات الحية حسب خصائصها...', 2);

INSERT INTO objectives (text, lesson_id) VALUES
('يتعرف الطالب على آداب الحوار', 1),
('يميز بين الأساليب اللغوية في الحوار', 1),
('يوظف المفردات الجديدة في جمل من إنشائه', 1),
('يستنتج معاني الكلمات من النص', 2),
('يعبر عن مشاعره تجاه الأصدقاء', 2),
('يعدد خصائص الكائنات الحية', 3),
('يقارن بين الكائنات والجمادات', 3),
('يصنف الكائنات حسب خصائصها', 4),
('يرسم مخطط تصنيفي مبسط', 4);
