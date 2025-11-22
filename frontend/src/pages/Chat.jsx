import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";

export default function Chat() {
  const token = localStorage.getItem("token");
  const me = JSON.parse(localStorage.getItem("user") || "null");
  const [convs, setConvs] = useState([]);
  const [sel, setSel] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [txt, setTxt] = useState("");

  useEffect(()=> {
    if (!token) return;
    axios.get(`${API_URL}/chats`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>setConvs(r.data)).catch(()=>{});
    const iv = setInterval(()=> {
      if (sel) {
        axios.get(`${API_URL}/chats/${sel.id}/messages`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>setMsgs(r.data)).catch(()=>{});
      }
    }, 2000);
    return ()=>clearInterval(iv);
  }, [sel]);

  const send = async ()=> {
    if (!txt || !sel) return;
    await axios.post(`${API_URL}/chats/${sel.id}/message`, { contenido: txt }, { headers: { Authorization: `Bearer ${token}` }});
    setTxt("");
  };

  return (
    <div style={{ padding: 20, display: "flex", gap: 12 }}>
      <div style={{ width: 250, background: "white", padding: 12, borderRadius: 8 }}>
        <h4>Conversaciones</h4>
        {convs.map(c => <div key={c.id} onClick={()=>setSel(c)} style={{ padding: 8, cursor: "pointer", background: sel?.id===c.id ? "#eee": "transparent" }}>{c.nombre}</div>)}
      </div>

      <div style={{ flex: 1, background: "white", padding: 12, borderRadius: 8, display: "flex", flexDirection: "column" }}>
        {!sel ? <div>Selecciona una conversación</div> :
          <>
            <div style={{ flex: 1, overflow: "auto", marginBottom: 8 }}>
              {msgs.map(m => (
                <div key={m.id} style={{ textAlign: m.remitente_id === me.id ? "right" : "left", marginBottom: 6 }}>
                  <div style={{ display: "inline-block", padding: 8, borderRadius: 8, background: m.remitente_id === me.id ? "#4f46e5" : "#e5e7eb", color: m.remitente_id === me.id ? "white" : "black" }}>{m.contenido}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={txt} onChange={e=>setTxt(e.target.value)} className="p-2 flex-1" />
              <button onClick={send} className="px-4 py-2 bg-purple-600 text-white rounded">Enviar</button>
            </div>
          </>
        }
      </div>
    </div>
  );
}
