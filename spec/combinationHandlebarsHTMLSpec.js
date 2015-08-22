var parser = require('../index');

describe('Combination Handlebars & HTML', function ()
{
	it ('Should recognize a simple address template', function ()
	{
		var result = parser.parse(
				'<span class="address-container-line"> \
					<p class="address-container-city" name="city"> \
						{{city}} \
					</p> \
					{{#if showState}} \
						<p class="address-container-state" name="state"> \
							{{state}} \
						</p> \
					{{/if}} \
					<p class="address-container-zip" name="zip"> \
						{{zip}} \
					</p> \
				</span>')
		,	expeted = [{"type":"htmlBlockNode","openTag":"span","closeTag":"span",
						"attributes":[{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"address-container-line"}]}],
						"children":[
							{"type":"htmlBlockNode","openTag":"p","closeTag":"p",
								"attributes":[{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"address-container-city"}]},
								{"type":"singleKey","subType":"extraSpaces","value":" "},
								{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"city"}]}],
								"children":[
									{"type":"handlebars","subType":"SAFEEVALUATION","value":"city"}]},
							{"type":"handlebars","subType":"IF","condition":{"type":"handlebars","subType":"SINGLEEVALUATION","value":"showState"},
								"ifBody":[
									{"type":"htmlBlockNode","openTag":"p","closeTag":"p",
										"attributes":[{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"address-container-state"}]},
											{"type":"singleKey","subType":"extraSpaces","value":" "},
											{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"state"}]}],
									"children":[{"type":"handlebars","subType":"SAFEEVALUATION","value":"state"}]}],
								"elseBody":[]},
							{"type":"htmlBlockNode","openTag":"p","closeTag":"p",
								"attributes":[{"type":"keyValue","key":"class","value":[{"type":"singleValue","value":"address-container-zip"}]},
									{"type":"singleKey","subType":"extraSpaces","value":" "},
									{"type":"keyValue","key":"name","value":[{"type":"singleValue","value":"zip"}]}],
								"children":[{"type":"handlebars","subType":"SAFEEVALUATION","value":"zip"}]}]}];

		expect(result).toEqual(expeted);
	});
});