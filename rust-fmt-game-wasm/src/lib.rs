mod utils;

#[macro_use]
use runtime_fmt::*;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

fn js_list_to_string_vec(l: Box<[JsValue]>) -> Option<Vec<String>> {
    // Since there's no way I know of to take a Vec of Option and transpose it,
    // we'll take a round-trip through Result to do the same operation.
    // Vec<Option<T>>
    // -> Vec<Result<T, ()>>
    // -> Result<Vec<T>, ()>
    // -> Option<Vec<T>>
    l.iter()
        .map(JsValue::as_string)
        .map(|v| match v {
            Some(x) => Ok(x),
            None => Err(()),
        })
        .collect::<Result<Vec<String>, ()>>()
        .ok()
}

fn error_to_jsvalue(e: Error) -> JsValue {
    JsValue::from_str(&format!("{:?}", e))
}

#[wasm_bindgen]
pub fn format(spec: &str, params: Box<[JsValue]>) -> Result<String, JsValue> {
    let params_strings = match js_list_to_string_vec(params) {
        Some(x) => x,
        None => return Err(JsValue::from_str("non-string param")),
    };

    let params = params_strings
        .iter()
        .map(|s| Param::normal(s))
        .collect::<Vec<_>>();

    let format_buf = FormatBuf::new(spec, &params).map_err(|e| error_to_jsvalue(e))?;

    Ok(format_buf.format())
}
