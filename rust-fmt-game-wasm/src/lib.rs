mod utils;

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

enum ParamFromJs {
    Str(String),
    Integer(u32),
}

impl ParamFromJs {
    fn as_param(&self) -> Param<'_> {
        use ParamFromJs::*;

        match self {
            Str(s) => Param::normal(s),
            Integer(i) => Param::normal(i),
        }
    }
}

fn error_to_jsvalue(e: Error) -> JsValue {
    JsValue::from_str(&format!("{:?}", e))
}

#[wasm_bindgen]
pub fn format(spec: &str, params: Box<[JsValue]>) -> Result<String, JsValue> {
    // Convert each formatting parameter to a Rust-usable type
    let params = params
        .iter()
        .map(|jsv| {
            if let Some(s) = jsv.as_string() {
                return Ok(ParamFromJs::Str(s));
            }

            if let Some(f) = jsv.as_f64() {
                if f == f.floor() {
                    return Ok(ParamFromJs::Integer(f as u32));
                } else {
                    return Err(String::from("numeric param was not integer"));
                }
            }

            return Err(String::from("invalid param type"));
        })
        .collect::<Result<Vec<ParamFromJs>, String>>();

    // If any parameter conversion failed, fail the whole call
    let params = match params {
        Ok(params) => params,
        Err(e) => return Err(JsValue::from_str(&e)),
    };

    let format_params = params.iter().map(ParamFromJs::as_param).collect::<Vec<_>>();
    let format_buf = FormatBuf::new(spec, &format_params).map_err(|e| error_to_jsvalue(e))?;

    Ok(format_buf.format())
}
