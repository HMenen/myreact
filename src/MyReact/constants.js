//文本元素
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');
//根Fiber
export const TAG_ROOT = Symbol.for('TAG_ROOT');
//原生节点 div span 等
export const TAG_HOST = Symbol.for('TAG_HOST');

export const TAG_TEXT = Symbol.for('TAG_TEXT');

export const TAG_CLASS = Symbol.for('TAG_CLASS');

//插入节点
export const PLACEMENT = Symbol.for('PLACEMENT');
//更新节点
export const UPDATE = Symbol.for('UPDATE')
//删除节点
export const DELETION = Symbol.for('DELETION')