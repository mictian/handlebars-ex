//@module HandlebarsGrammar

//@class HandlebarsGrammarContext
{

	//@method joinAttributeSpaces Given a group of ignorable characters (spaces, enters, tabs, etc) this method clean it an returns only the valid spaces
	//@param {Array<Character>} spaces Please notice this is just an array of string, but based on how PEG works each string will be 1 character long
	//@param {String} Final string containing only spaces
	function joinAttributeSpaces (spaces)
	{
		return isArray(spaces) ? spaces.join('').replace(/\t|\n/g, '') : '';
	}

	//@method isArray Auxiliary method to determine is an object is or not an array
	//@param {Object} obj
	//@return {Boolean} True if the parameter passed in is an array false otherwise
 	function isArray (obj)
	{
		return Object.prototype.toString.call(obj) === '[object Array]';
	}

	//@method generateAttributeSpaceNode Generates an artificial singleKey attribute node to represent spaces among values
	//We add the ignored space as they play an important role when setting a property's value
	//name="prop1{{V1}}" is not the same as name="prop1 {{V1}}"
	//@param {String} spaces_value String containing all the spaces to add
	//@return {ExtraSpaceSimpleKeyHTMLAttributeASTNode}
	function generateAttributeSpaceNode (space_value)
	{
		//@class ExtraSpaceSimpleKeyHTMLAttributeASTNode @extends SimpleKeyHTMLAttributeASTNode
		return {
			//@property {String} type Value 'singleKey'
			type: 'singleKey'
			//@property {String} subType Value 'extraSpaces'
		,	subType: 'extraSpaces'
			//@property {String} value Variable length string of only spaces
		,	value: space_value
		};
		//@class HandlebarsGrammarContext
	}

	//@method generateAndConcatAttributeSpaceNode Auxiliary method used to concatenate spaces in the middle of two arrays.
	//The spaces are converted into a ExtraSpaceSimpleKeyHTMLAttributeASTNode object and is appended only of the length of the string space is greater than 0
	//@param {Array<AttributeASTNode>|AttributeASTNode} accumulator_nodes
	//@param {Array<Character>} spaces Please notice this is just an array of string, but based on how PEG works each string will be 1 character long
	//@param {Array<AttributeASTNode>?|AttributeASTNode?} tail_values This value is optional
	//@return {Array<AttributeASTNode>} Result after concatenating all values
	function generateAndConcatAttributeSpaceNode (accumulator_nodes, spaces, tail_values)
	{
		var spaces_value = joinAttributeSpaces(spaces)
		,	result = [];

		accumulator_nodes = accumulator_nodes instanceof Array ? accumulator_nodes : [accumulator_nodes];

		if (spaces_value.length)
		{
			var spaces_obj = generateAttributeSpaceNode(spaces_value);

			result = accumulator_nodes.concat(spaces_obj);
			result = !!tail_values ? result.concat(tail_values) : result;
		}
		else
		{
			result = !!tail_values ? accumulator_nodes.concat(tail_values) : accumulator_nodes;
		}

		return result;
	}

	//@method concatSortedSpaces Auxiliary method used to concatenate an array in the middle of spaces
	//@param {Array<Character>} head_spaces This value is optional
	//@param {Array<AttributeASTNode>?|AttributeASTNode?} body_nodes This value is optional
	//@param {Array<Character>} tail_spaces This value is optional
	//@return {Array<AttributeASTNode>}
	function concatSortedSpaces (head_spaces, body_nodes, tail_spaces)
	{
		var result = []
		,	head_space_word = joinAttributeSpaces(head_spaces || '')
		,	tail_space_word = joinAttributeSpaces(tail_spaces || '');

		if (head_space_word.length)
		{
			result = result.concat(generateAttributeSpaceNode(head_spaces));
		}
		if (body_nodes)
		{
			result = result.concat(body_nodes);
		}

		if (tail_space_word.length)
		{
			result = result.concat(generateAttributeSpaceNode(tail_space_word));
		}

		return result;
	}

	//@method getHandlebarsBaseConditionObject Auxiliary method to generate condition nodes
	//@param {Array<String>} condition
	//@param {String?} type String type to override default 'handlebars' type
	//@param {String?} prefix Optional prefix to add to the subType of the returning object
	//@return {HandlebarsBaseConditionNodeAST}
	function getHandlebarsBaseConditionObject (condition, type, prefix)
	{
		prefix = prefix || '';
		type = type || 'handlebars';

		//@class HandlebarsBaseConditionNodeAST
		var condition_obj = {
				//@property {String} type Value 'handlebars'
				type: type
				//@property {String} subType Possible values:
				// 'LOOKUPSINGLE' in case the condition is a look up (Array of String),
				// 'REFERENCEEVALUATION' in case the condition is a reference values (a string IN THE TEMPLATE starting with '@'),
				// 'SINGLEEVALUATION' in the the condition is a simple string denoting a simple evaluation
				// This values are used with the prefix 'ATTR' when this nodes are created in the context of an attribute
			,	subType: ''
				//@property {String|Array<String>} value The condition
			,	value: condition
			};
		//@class HandlebarsGrammarContext

		if (condition.length > 1)
		{
			condition_obj.subType = prefix + 'LOOKUPSINGLE';
			condition_obj.value = condition;
		}
		else if (condition[0].indexOf('@') === 0)
		{
			condition_obj.subType = prefix + 'REFERENCEEVALUATION';
			condition_obj.value = condition[0];
		}
		else
		{
			condition_obj.subType = prefix + 'SINGLEEVALUATION';
			condition_obj.value = condition[0];
		}

		return condition_obj;
	}

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//															NODES START 																	//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

start
	= nodes

nodes
	= n:node ignorable* ns:nodes
		{
			return isArray(n) ? n.concat(ns) : [n].concat(ns) ;
		}
	/ n:node
		{
			return [n];
		}

//@class NodeASTNode
node
	//@class HTMLNodeASTNode @extends NodeASTNode
	= htmlNode
	/ textNode
	//@class HandlebarsNodeASTNode @extends NodeASTNode
	/ handlebarsNode


//***********************
//	SIMPLE HTML NODES START
//***********************

htmlNode
	= htmlBlockNode
	/ htmlSingleNode


//@class BlockHTMLNodeASTNode @extends HTMLNodeASTNode
htmlBlockNode
	= ignorable* '<' !"!--" !voidElement !"input" openTagName:word ignorable* attrs:(attributes)? ignorable* ">" ignorable* ns:(nodes)? ignorable* "</" closeTagName:word ">" ignorable*
		{
			return {
				//@property {String} type Value 'htmlBlockNode'
				type: 'htmlBlockNode'
				//@property {String} openTag
			,	openTag: openTagName
				//@property {String} closeTag
			,	closeTag: closeTagName
				//@property {Array<AttributeASTNode>} attributes
			,	attributes: attrs || []
				//@property {Array<NodeASTNode>} children
			,	children: ns || []
			};
		}
	/ ignorable* "<input" ignorable* attrs:(attributes)? ignorable* ">" f:(ignorable* (nodes)? ignorable* "</input>")?
		{
			return {
				type: 'htmlBlockNode'
			,	openTag: 'input'
			,	closeTag: 'input'
			,	attributes: attrs || []
			,	children: isArray(f[1]) ? f[1] :  []
			};
		}

//@class SingleHTMLNodeASTNode @extends HTMLNodeASTNode
htmlSingleNode
	= ignorable* "<" !"!--" tagName:voidElement ignorable* attrs:(attributes)? ignorable* "/"? ">"
		{
			return {
				//@property {String} type Possible values: 'htmlSingleNode', 'htmlComment'
				type: 'htmlSingleNode'
				//@property {String?} tag This attribute will be null in can the node is of type 'htmlComment'
			,	tag: tagName
				//@property {Array<AttributeASTNode>} attributes
			,	attributes: attrs || []
			};
		}
	/ ignorable* "<input" space*  attrs:(attributes)? space*  "/>"
		{
			return {
				type: 'htmlSingleNode'
			,	tag: 'input'
			,	attributes: attrs || []
			};
		}
	/ ignorable* '<!--' c:htmlCommentToken* '-->'
		{
			return {
				type: 'htmlComment'
				//@property {String?} value This property that contains the comment it self will be only present if the node is a comment
			,	value: c.join('')
			};
		}

htmlCommentToken
	= !"-->" c:.
		{
			return c;
		}

voidElement
	= "area"
	/ "base"
	/ "basefont"
	/ "br"
	/ "col"
	/ "command"
	/ "embed"
	/ "frame"
	/ "hr"
	/ "img"
	/ "isindex"
	/ "keygen"
	/ "link"
	/ "meta"
	/ "param"
	/ "source"
	/ "track"
	/ "wbr"

	//common self closing svg elements
	/ "path"
	/ "circle"
	/ "ellipse"
	/ "line"
	/ "rect"
	/ "use"
	/ "stop"
	/ "polyline"
	/ "polygon"


//***********************
//	TEXT HTML NODES START
//***********************

//@class TextNodeASTNode @extends NodeASTNode
textNode
	= ignorable* w:wordWithSlash+ ignorable*
		{
			return {
				//@property {String} type Value 'text'
				type: 'text'
				//@property {String} value
			,	value: w.join('')
			};
		}

wordWithSlash
	= /*!ignorable*/ w:[^>}{<'"\n\t]
		{
			return w;
		}

//***********************
//	HANDLEBARS NODES START
//***********************

handlebarsNode
	= handlebarsBlockNode
	/ handlebarsSingleNode


//***********************
//	HANDLEBARS NODES START Block
//***********************

//@class BlockHandlebarsNodeASTNode @extends HandlebarsNodeASTNode
handlebarsBlockNode
	= handlebarsIfBlock
	/ handlebarsEachBlock
	/ handlebarsUnlessBlock
	/ handlebarsGenericBlock


//@class IfBlockHandlebarsNodeASTNode @extends BlockHandlebarsNodeASTNode
handlebarsIfBlock
	= ignorable* "{{#if" space* condition:lookUpWords space* "}}" ignorable* ifBody:(nodes)? ignorable* elseBody:(handlebarsElseBlock)? ignorable* "{{/if}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'IF'
			,	subType: 'IF'
				//@property {HandlebarsBaseConditionNodeAST} condition
			,	condition: getHandlebarsBaseConditionObject(condition)
				//@property {Array<NodeASTNode>} ifBody
			,	ifBody: ifBody || []
				//@property {Array<NodeASTNode>} elseBody
			,	elseBody: elseBody || []
			};
		}

//@class EachBlockHandlebarsNodeASTNode @extends BlockHandlebarsNodeASTNode
handlebarsEachBlock
	= ignorable* "{{#each" space* iterator:lookUpWords space* "}}" ignorable* eachBody:(nodes)? ignorable* elseBody:(handlebarsElseBlock)? ignorable* "{{/each}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'EACH'
			,	subType: 'EACH'
				//@property {HandlebarsBaseConditionNodeAST} iterator
			,	iterator: getHandlebarsBaseConditionObject(iterator)
				//@property {Array<NodeASTNode>} eachBody
			,	eachBody: eachBody || []
				//@property {Array<NodeASTNode>} elseBody
			,	elseBody: elseBody || []
			};
		}

//@class UnlessBlockHandlebarsNodeASTNode @extends BlockHandlebarsNodeASTNode
handlebarsUnlessBlock
	= ignorable* "{{#unless" space* condition:lookUpWords space* "}}" ignorable* unlessBody:(nodes)? ignorable* elseBody:(handlebarsElseBlock)? ignorable* "{{/unless}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'UNLESS'
			,	subType: 'UNLESS'
				//@property {HandlebarsBaseConditionNodeAST} condition
			,	condition: getHandlebarsBaseConditionObject(condition)
				//@property {Array<NodeASTNode>} unlessBody
			,	unlessBody: unlessBody || []
				//@property {Array<NodeASTNode>} elseBody
			,	elseBody: elseBody || []
			};
		}

//@class GenericBlockHandlebarsNodeASTNode @extends BlockHandlebarsNodeASTNode
handlebarsGenericBlock
	= '{{#' openTagName:word space* params:(params)? space* "}}" ignorable* children:(nodes)? ignorable* "{{/" closeTagName:word "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'GENERICBLOCK'
			,	subType: 'GENERICBLOCK'
				//@property {String} openTag
			,	openTag: openTagName
				//@property {String} closeTag
			,	closeTag: closeTagName
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: params || []
				//@property {Array<NodeASTNode>} children
			,	children: children || []
			};
		}

handlebarsElseBlock
	= "{{else}}" ignorable* ns:(nodes)?
		{
			return ns || [];
		}


//***********************
//	HANDLEBARS NODES START Single
//***********************

//@class SingleHandlebarsNodeASTNode @extends HandlebarsNodeASTNode
handlebarsSingleNode
	= handlebarsSafeEvaluation
	/ handlebarsUnSafeEvaluation
	/ handlebarsLookup
	/ handlebarsSingleComment
	/ handlebarsSafeGenericSingle
	/ handlebarsUnSafeGenericSingle

//@class SafeEvaluationSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsSafeEvaluation
	= "{{" !"." !"else" space* w:word space* "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Possible values:
				// 'SAFEREFERENCEEVALUATION' in case the value starts with '@',
				// 'SAFEEVALUATION' otherwise
			,	subType: w.indexOf('@') === 0 ? 'SAFEREFERENCEEVALUATION' : 'SAFEEVALUATION'
				//@property {String} value
			,	value: w
			};
		}

//@class UnSafeEvaluationSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsUnSafeEvaluation
	= "{{{" space* w:word space* "}}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Possible values:
				// 'UNSAFEREFERENCEEVALUATION' in case the value starts with '@',
				// 'UNSAFEEVALUATION' otherwise
			,	subType: w.indexOf('@') === 0 ? 'UNSAFEREFERENCEEVALUATION' : 'UNSAFEEVALUATION'
				//@property {String} value
			,	value: w
			};
		}

//@class LookupSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsLookup
	= "{{" !"else" space* w:lookUpWords space* "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'LOOKUPSINGLE'
			,	subType: 'LOOKUPSINGLE'
				//@property {Array<String>} value
			,	value: w
			};
		}

//@class CommentSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsSingleComment
	= "{{!--" c:handlebarsSingleCommentToken* "--}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'SINGLECOMMENTS'
			,	subType: 'SINGLECOMMENTS'
				//@property {String} value
			,	value: c.join('')
			};
		}

handlebarsSingleCommentToken
	= !"--}}" t:.
		{
			return t;
		}

//@class SafeGenericSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsSafeGenericSingle
	= "{{" !"." !"!--" w:word space+ ps:params space* "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'GENERICSINGLE'
			,	subType: 'GENERICSINGLE'
				//@property {String} value
			,	value: w
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: ps
			};
		}

//@class UnSafeGenericSingleHandlebarsNodeASTNode @extends SingleHandlebarsNodeASTNode
handlebarsUnSafeGenericSingle
	= "{{{" !"." !"!--" w:word space+ ps:params space* "}}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'UNSAFEGENERICSINGLE'
			,	subType: 'UNSAFEGENERICSINGLE'
				//@property {String} value
			,	value: w
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: ps
			};
		}

//***********************
//	HANDLEBARS NODES HELPERS START
//***********************

lookUpWords
	= w:word "/" ws:lookUpWords
		{
			return [w].concat(ws);
		}
	/ w:word
		{
			return [w];
		}

//Generic Single handlebar code parameters
params
	= p:param space* ps:params
		{
			return p.concat(ps);
		}
	/ param

//@class ParameterHandlebarsNodeASTNode
param
	= "'" ws:paramTokenSingleQuote* "'"
		{
			return [{
				//@property {String} type Value 'parameter'
				type: 'parameter'
				//@property {String} subType Possible values:
				// 'SIMPLEVALUE' in case of a simple string parameter (in the case it appears between quotes in the template),
				// 'LOOKUPSINGLE' when the value property is an array of strings,
				// 'REFERENCEEVALUATION' in case the value property is a reference evaluation (starts with '@'),
				// 'SINGLEEVALUATION' otherwise (when the value represents a simple variable evaluation)
			,	subType: 'SIMPLEVALUE'
				//@property {String|Array<String>} value
			,	value: "'" + ws.join('') + "'"
			}];
		}
	/ '"' ws:paramTokenDoubleQuote* '"'
		{
			return [{
				type: 'parameter'
			,	subType: 'SIMPLEVALUE'
			,	value: '"' + ws.join('') + '"'
			}];
		}
	/  l:lookUpWords
		{
			return [getHandlebarsBaseConditionObject(l, 'parameter')];
		}

paramTokenSingleQuote
	= "\\'"
	/ [^']

paramTokenDoubleQuote
	= '\\"'
	/ [^"]



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//														ATTRIBUTES START 																	//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//@class AttributeASTNode Base class for all HTML attribute nodes @extends NodeASTNode
attributes
	= il:itemList
		{
			return isArray(il) ? il : [il];
		}

//itemList represent all possible attributesSimple combination between standard attributesSimple and handlebars attributesSimple
itemList
	= props:attributesSimple spaces:ignorable* itemList:itemList
		{
			return generateAndConcatAttributeSpaceNode(props, spaces, itemList);
		}
	/ props:attributesHandlebars spaces:ignorable* itemList:itemList
		{
			return generateAndConcatAttributeSpaceNode(props, spaces, itemList);
		}
	/ attributesSimple
	/ attributesHandlebars

//***********************
//	SIMPLE ATTRIBUTES
//***********************

attributesSimple
	= !"/>" !">" prop:attributeSimple spaces:ignorable* props:attributesSimple
		{
			return generateAndConcatAttributeSpaceNode(prop, spaces, props);
		}
	/ !"/>" !">" as:attributeSimple
		{
			return as;
		}

//@class HTMLAttributeASTNode @extends AttributeASTNode
attributeSimple
	//@class KeyValueHTMLAttributeASTNode @extends HTMLAttributeASTNode
	= k:attributeSimpleKeyWrapper "=" v:attributeSimpleValueWrapper
		{
			return {
				//@property {String} type Value 'keyValue'
				type: 'keyValue'
				//@property {String} key
			,	key: k.value
				//@property {Array<SimpleValueHTMLAttributeASTNode>} value
			,	value: v
			};
		}
	/ attributeSimpleKeyWrapper

attributeSimpleKeyWrapper
	= "\"" pk:attributeSimpleKey "\""
		{
			return pk;
		}
	/ "'" pk:attributeSimpleKey "'"
		{
			return pk;
		}
	/ attributeSimpleKey

//@class SimpleKeyHTMLAttributeASTNode @extends HTMLAttributeASTNode
attributeSimpleKey
	= keyName:[^ "'{}=>]+
		{
			return {
				//@property {String} type Value 'singleKey'
				type: "singleKey"
				//@property {String} value
			,	value: keyName.join('')
			};
		}

attributeSimpleValueWrapper
	= attributeSimpleValueWrapperSingleQuote
	/ attributeSimpleValueWrapperDoubleQuote


//@class SimpleValueHTMLAttributeASTNode @extends HTMLAttributeASTNode
attributeSimpleValueWrapperSingleQuote
	= "'" values:attributeSimpleValuesSingleQuote "'"
		{
			return values;
		}
	/ "''"
		{
			return [{
				//@property {String} type Value 'singleValue'
				type: 'singleValue'
				//@property {String} value
			,	value: ''
			}];
		}

attributeSimpleValuesSingleQuote
	= v:attributeSimpleValueSingleQuote spaces:ignorable* vs:attributeSimpleValuesSingleQuote
		{
			return generateAndConcatAttributeSpaceNode(v, spaces, vs);
		}
	/ v:attributeSimpleValueSingleQuote spaces:ignorable*
		{
			return generateAndConcatAttributeSpaceNode(v, spaces);
		}

attributeSimpleValueSingleQuote
	= valueName:[^ '{}]+
		{
			return {
				type: 'singleValue'
			,	value: valueName.join('')
			};
		}
	/ attributesHandlebars

attributeSimpleValueWrapperDoubleQuote
 	= "\"" values:attributeSimpleValuesDoubleQuote "\""
		{
			return values;
		}
	/ "\"\""
		{
			return [{
				type: 'singleValue'
			,	value: ''
			}];
		}

attributeSimpleValuesDoubleQuote
	= v:attributeSimpleValueDoubleQuote spaces:ignorable* vs:attributeSimpleValuesDoubleQuote
		{
			return generateAndConcatAttributeSpaceNode(v, spaces, vs);
		}
	/ v:attributeSimpleValueDoubleQuote spaces:ignorable*
		{
			return generateAndConcatAttributeSpaceNode(v, spaces);
		}

attributeSimpleValueDoubleQuote
	= valueName:[^ "{}]+
		{
			return {
				type: 'singleValue'
			,	value: valueName.join('')
			};
		}
	/ attributesHandlebars


//***********************
//	HANDLEBARS ATTRIBUTES
//***********************

//@class HandlebarsAttributeASTNode @extends AttributeASTNode
attributesHandlebars
	= attributesHandlebarsBlock
	/ attributesHandlebarsSingle


//***********************
//	HANDLEBARS ATTRIBUTES Block
//***********************

attributesHandlebarsBlock
	= h:attributeHandlebarsBlock spaces:ignorable* hs:attributesHandlebarsBlock
		{
			return generateAndConcatAttributeSpaceNode(h, spaces, hs);
		}
	/ attributeHandlebarsBlock

//@class BlockHandlebarsAttributeASTNode @extends HandlebarsAttributeASTNode
attributeHandlebarsBlock
	= attributeHandlebarsBlockIF
	/ attributeHandlebarsBlockEACH
	/ attributeHandelbarsBlockUNLESS
	/ attributeHandlebarsBlockGENERIC

//@class IfBlockHandlebarsAttributeASTNode @extends BlockHandlebarsAttributeASTNode
attributeHandlebarsBlockIF
	= "{{#if" space* condition:lookUpWords space* "}}" s1:ignorable* ifBody:(itemList)? s2:ignorable* elseBody:(handlebarsIfElseBlock)? s3:ignorable* "{{/if}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRIF'
			,	subType: 'ATTRIF'
				//@property {HandlebarsBaseConditionNodeAST} condition
			,	condition: getHandlebarsBaseConditionObject(condition, null, 'ATTR')
				//@property {Array<AttributeASTNode>} ifBody
			,	ifBody: concatSortedSpaces(s1, ifBody || [], s2)
				//@property {Array<AttributeASTNode>} elseBody
			,	elseBody: concatSortedSpaces(null, elseBody || [], s3)
			};
		}

//@class EachBlockHandlebarsAttributeASTNode @extends BlockHandlebarsAttributeASTNode
attributeHandlebarsBlockEACH
	= "{{#each" space* iterator:lookUpWords space* "}}" s1:ignorable* eachBody:(itemList)? s2:ignorable* elseBody:(handlebarsIfElseBlock)? s3:ignorable* "{{/each}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTREACH'
			,	subType: 'ATTREACH'
				//@property {HandlebarsBaseConditionNodeAST} iterator
			,	iterator: getHandlebarsBaseConditionObject(iterator, null, 'ATTR')
				//@property {Array<AttributeASTNode>} eachBody
			,	eachBody: concatSortedSpaces(s1, eachBody || [], s2)
				//@property {Array<AttributeASTNode>} elseBody
			,	elseBody: concatSortedSpaces(null, elseBody || [], s3)
			};
		}

//@class UnlessBlockHandlebarsAttributeASTNode @extends BlockHandlebarsAttributeASTNode
attributeHandelbarsBlockUNLESS
	= "{{#unless" space* condition:lookUpWords space* "}}" s1:space* unlessBody:(itemList)? s2:space* elseBody:(handlebarsIfElseBlock)? s3:space* "{{/unless}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRUNLESS'
			,	subType: 'ATTRUNLESS'
				//@property {HandlebarsBaseConditionNodeAST} condition
			,	condition: getHandlebarsBaseConditionObject(condition, null, 'ATTR')
				//@property {Array<AttributeASTNode>} unlessBody
			,	unlessBody: concatSortedSpaces(s1, unlessBody || [], s2)
				//@property {Array<AttributeASTNode>} elseBody
			,	elseBody: concatSortedSpaces(null, elseBody || [], s3)
			};
		}

handlebarsIfElseBlock
	= "{{else}}" spaces:ignorable* il:(itemList)?
		{
			return concatSortedSpaces(spaces, il || []);
		}

//@class GenericBlockHandlebarsAttributeASTNode @extends BlockHandlebarsAttributeASTNode
attributeHandlebarsBlockGENERIC
	= "{{#" openName:word space* params:(params)? space* "}}" ignorable* l:(itemList)? ignorable* "{{/" closeName:word "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRGENERICBLOCK'
			,	subType: 'ATTRGENERICBLOCK'
				//@property {Array<AttributeASTNode>} value
			,	value: l || []
				//@property {String} openTag
			,	openTag: openName
				//@property {String} closeTag
			,	closeTag: closeName
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: params
			};
		}

//***********************
//	HANDLEBARS ATTRIBUTES Single
//***********************

//@class SingleHandlebarsAttributeASTNode @extends HandlebarsAttributeASTNode
attributesHandlebarsSingle
	= attributeHandlebarsSingleSAFE
	/ attributeHandlebarsSingleGENERICSAFE
	/ attributeHandlebarsSingleUNSAFE
	/ attributeHandlebarsSingleGENERICUNSAFE
	/ attributeHandlebarsSingleCOMMENT


//@class SafeSingleHandlebarsAttributeASTNode @extends SingleHandlebarsAttributeASTNode
attributeHandlebarsSingleSAFE
	= "{{" !"else" space* value:lookUpWords space* "}}"
		{
			return getHandlebarsBaseConditionObject(value, null, 'ATTR');
		}

//@class GenericSafeSingleHandlebarsAttributeASTNode @extends SingleHandlebarsAttributeASTNode
attributeHandlebarsSingleGENERICSAFE
	= "{{" !"!--" !"else" space* v:word space* parameterList:(params)? space* "}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRGENERICSINGLE'
			,	subType: 'ATTRGENERICSINGLE'
				//@property {String} value
			,	value: v
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: parameterList || []
			};
		}

//@class UnSafeSingleHandlebarsAttributeASTNode @extends SingleHandlebarsAttributeASTNode
attributeHandlebarsSingleUNSAFE
	= "{{{" !"else" space* value:lookUpWords space* "}}}"
		{
			return getHandlebarsBaseConditionObject(value, null, 'ATTRUNSAFE');
		}

//@class GenericUnSafeSingleHandlebarsAttributeASTNode @extends SingleHandlebarsAttributeASTNode
attributeHandlebarsSingleGENERICUNSAFE
	= "{{{" !"else" v:word space* parameterList:(params)? space* "}}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRUNSAFEGENERICSINGLE'
			,	subType: 'ATTRUNSAFEGENERICSINGLE'
				//@property {String} value
			,	value: v
				//@property {Array<ParameterHandlebarsNodeASTNode>} parameters
			,	parameters: parameterList || []
			};
		}

//@class CommentSingleHandlebarsAttributeASTNode @extends SingleHandlebarsAttributeASTNode
attributeHandlebarsSingleCOMMENT
	= "{{!--" c:attributeHandlebarsSingleCOMMENTToken* "--}}"
		{
			return {
				//@property {String} type Value 'handlebars'
				type: 'handlebars'
				//@property {String} subType Value 'ATTRSINGLECOMMENTS'
			,	subType: 'ATTRSINGLECOMMENTS'
				//@property {String} value
			,	value: c.join('')
			};
		}

attributeHandlebarsSingleCOMMENTToken
	= !"--}}" t:.
		{
			return t;
		}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//															UTILS START 																	//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

word
	= !"/" w:[^ '"/><{}\t]+
		{
			return w.join('');
		}

ignorable
	= [ \n\t]

space
	= ' '
