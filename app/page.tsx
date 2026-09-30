"use client";

import { useMemo, useState } from "react";

type Student={id:number;name:string;grade:number;positive:number;negative:number};
type Penalty={id:number;studentId:number;item:string;points:number;enteredBy:string;date:string;reflection:boolean;source:"선도부"|"사생회"};

const initialStudents:Student[]=[
 {id:1,name:"김민준",grade:3,positive:6,negative:9},
 {id:2,name:"이서연",grade:2,positive:4,negative:5},
 {id:3,name:"박지훈",grade:1,positive:8,negative:2}
];

const initialPenalties:Penalty[]=[
 {id:1,studentId:1,item:"지각",points:3,enteredBy:"선도부 1",date:"2026-09-30",reflection:true,source:"선도부"},
 {id:2,studentId:1,item:"복장불량",points:3,enteredBy:"사생회 1",date:"2026-09-30",reflection:false,source:"사생회"}
];

export default function Home(){
 const [role,setRole]=useState<"선도부"|"사생회">("선도부");
 const [tab,setTab]=useState("대시보드");
 const [students,setStudents]=useState(initialStudents);
 const [penalties,setPenalties]=useState(initialPenalties);
 const [search,setSearch]=useState("");
 const [open,setOpen]=useState(false);
 const [form,setForm]=useState({studentId:"1",item:"지각",points:"1",enteredBy:"",reflection:false});
 const visible=useMemo(()=>students.filter(s=>s.name.includes(search)),[students,search]);
 const totalPenalty=penalties.reduce((a,p)=>a+p.points,0);
 const addPenalty=()=>{
   const studentId=Number(form.studentId), points=Math.max(1,Number(form.points)||0);
   if(!form.enteredBy.trim()) return alert("기입자 이름을 입력해주세요.");
   if(!form.item.trim()) return alert("벌점 항목을 입력해주세요.");
   const record:Penalty={id:Date.now(),studentId,item:form.item,points,enteredBy:form.enteredBy,date:new Date().toISOString().slice(0,10),reflection:form.reflection,source:role};
   setPenalties(v=>[record,...v]);
   setStudents(v=>v.map(s=>s.id===studentId?{...s,negative:s.negative+points}:s));
   setOpen(false); setForm({...form,enteredBy:"",reflection:false});
 };
 const studentName=(id:number)=>students.find(s=>s.id===id)?.name??"알 수 없음";
 return <div className="app">
  <aside className="sidebar">
   <div className="brand">⚖ 다니엘의 저울<small>학교 학생회 상·벌점 관리 시스템</small></div>
   <div className="nav">{["대시보드","학생 관리","벌점 관리","반성문 관리","처분 관리","벌점 항목 관리"].map(x=><button key={x} className={tab===x?"active":""} onClick={()=>setTab(x)}>{x}</button>)}</div>
  </aside>
  <main className="main">
   <div className="topbar"><div><h1>{tab}</h1><div style={{color:"#667085",marginTop:6}}>현재 로그인 역할: {role}</div></div><span className="role">{role}</span></div>
   {tab==="대시보드"&&<>
    <div className="stats"><div className="card"><div className="label">학생</div><div className="value">{students.length}</div></div><div className="card"><div className="label">전체 벌점</div><div className="value">{totalPenalty}</div></div><div className="card"><div className="label">반성문 미제출</div><div className="value">{penalties.filter(p=>!p.reflection).length}</div></div><div className="card"><div className="label">3주 연속 조건</div><div className="value">확인 중</div></div></div>
    <div className="card"><div className="toolbar"><input className="search" placeholder="학생 이름 검색" value={search} onChange={e=>setSearch(e.target.value)}/><div className="actions"><button className="btn primary" onClick={()=>setOpen(true)}>+ 벌점 입력</button><button className="btn" onClick={()=>setRole(role==="선도부"?"사생회":"선도부")}>역할 전환</button></div></div>
     <table className="table"><thead><tr><th>학년</th><th>이름</th><th>상점</th><th>벌점</th><th>상태</th></tr></thead><tbody>{visible.map(s=><tr key={s.id}><td>{s.grade}학년</td><td><b>{s.name}</b></td><td>{s.positive}</td><td>{s.negative}</td><td><span className="badge">{s.negative>=8?"체력훈련 대상":"정상"}</span></td></tr>)}</tbody></table>
    </div>
   </>}
   {tab==="벌점 관리"&&<div className="card"><div className="toolbar"><div><b>벌점 기록</b><div className="label">선도부와 사생회 모두 벌점을 추가할 수 있습니다.</div></div><button className="btn primary" onClick={()=>setOpen(true)}>+ 벌점 항목 추가</button></div><table className="table"><thead><tr><th>학생</th><th>항목</th><th>점수</th><th>기입자</th><th>입력 역할</th><th>반성문</th></tr></thead><tbody>{penalties.map(p=><tr key={p.id}><td>{studentName(p.studentId)}</td><td>{p.item}</td><td>{p.points}</td><td>{p.enteredBy}</td><td>{p.source}</td><td><span className={p.reflection?"badge":"badge warn"}>{p.reflection?"제출":"미제출"}</span></td></tr>)}</tbody></table></div>}
   {tab!=="대시보드"&&tab!=="벌점 관리"&&<div className="card"><div className="empty">이 화면은 다음 개발 단계에서 실제 기능으로 연결됩니다.</div></div>}
  </main>
  {open&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setOpen(false)}><div className="modal"><h2>{role} 벌점 입력</h2><div className="form">
    <div className="field"><label>학생</label><select value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})}>{students.map(s=><option key={s.id} value={s.id}>{s.grade}학년 · {s.name}</option>)}</select></div>
    <div className="field"><label>벌점 항목</label><input list="penalty-items" value={form.item} onChange={e=>setForm({...form,item:e.target.value})}/><datalist id="penalty-items"><option value="지각"/><option value="복장불량"/><option value="신발장 미정리"/><option value="선생님 재량 벌점"/><option value="기타 직접 입력"/></datalist></div>
    <div className="field"><label>벌점</label><input type="number" min="1" max={form.item==="선생님 재량 벌점"?5:100} value={form.points} onChange={e=>setForm({...form,points:e.target.value})}/></div>
    <div className="field"><label>기입자</label><input placeholder="이름을 직접 입력" value={form.enteredBy} onChange={e=>setForm({...form,enteredBy:e.target.value})}/></div>
    <label><input type="checkbox" checked={form.reflection} onChange={e=>setForm({...form,reflection:e.target.checked})}/> 반성문 제출</label>
    <div className="modal-actions"><button className="btn" onClick={()=>setOpen(false)}>취소</button><button className="btn primary" onClick={addPenalty}>등록</button></div>
   </div></div></div>}
 </div>
}
