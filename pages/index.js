export default function Home() {
  async function consultar() {
    const base = document.getElementById("base").value;
    const info = document.getElementById("info").value.trim();
    const resultado = document.getElementById("resultado");

    if (!info) {
      resultado.textContent = "⚠️ Campo vazio";
      return;
    }

    resultado.textContent = "🔎 Consultando...";

    try {
      const res = await fetch(`/api/proxy?base=${base}&info=${info}`);
      const json = await res.json();
      resultado.textContent = JSON.stringify(json, null, 2);
      window.__res = json;
    } catch (err) {
      resultado.textContent = "❌ Erro: " + err.message;
    }
  }

  function exportar() {
    const blob = new Blob([JSON.stringify(window.__res, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resultado.json";
    link.click();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">👁️ LUFFY EYES</h1>
      <div className="bg-white p-6 rounded shadow max-w-xl w-full space-y-4">
        <select id="base" className="w-full border p-2 rounded">
          <option value="cpf">CPF</option>
          <option value="cnpj">CNPJ</option>
          <option value="rg">RG</option>
          <option value="cpfsimpl">CPF Simples</option>
          <option value="rgsimpl">RG Simples</option>
          <option value="nome">Nome</option>
          <option value="pis">PIS</option>
          <option value="titulo">Título</option>
          <option value="telefone">Telefone</option>
          <option value="email">Email</option>
          <option value="cns">CNS</option>
          <option value="mae">Mãe</option>
          <option value="pai">Pai</option>
          <option value="placa">Placa</option>
          <option value="chassi">Chassi</option>
          <option value="renavam">Renavam</option>
          <option value="motor">Motor</option>
          <option value="fotorj">Foto RJ</option>
          <option value="fotosp">Foto SP</option>
          <option value="funcionarios">Funcionários</option>
          <option value="razao">Razão Social</option>
        </select>
        <input id="info" type="text" placeholder="Digite a informação" className="w-full border p-2 rounded" />
        <div className="flex gap-2">
          <button onClick={consultar} className="flex-1 bg-blue-600 text-white p-2 rounded">Consultar</button>
          <button onClick={exportar} className="bg-gray-300 p-2 rounded">⬇️ Exportar</button>
        </div>
        <pre id="resultado" className="bg-gray-100 p-4 rounded text-sm h-64 overflow-y-auto">
📝 O resultado aparecerá aqui...
        </pre>
      </div>
    </div>
  );
    }
    
