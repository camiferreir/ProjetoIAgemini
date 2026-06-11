
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-agendamento");
    const inputData = document.getElementById("data-agendamento");
    const inputTelefone = document.getElementById("telefone-tutor");
    const customAlert = document.getElementById("custom-alert");

    
    function configurarDataMinima() {
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        let mm = hoje.getMonth() + 1;
        let dd = hoje.getDate();

        if (mm < 10) mm = '0' + mm;
        if (dd < 10) dd = '0' + dd;

        const dataFormatada = `${yyyy}-${mm}-${dd}`;
        inputData.min = dataFormatada;
    }
    configurarDataMinima();

    inputTelefone.addEventListener("input", function (e) {
        let valor = e.target.value;
   
        valor = valor.replace(/\D/g, "");
    
        if (valor.length > 0) {
            valor = "(" + valor;
        }
        if (valor.length > 3) {
            valor = valor.slice(0, 3) + ") " + valor.slice(3);
        }
        if (valor.length > 10) {
            valor = valor.slice(0, 10) + "-" + valor.slice(10);
        }
   
        e.target.value = valor.slice(0, 15);
    });


    function exibirAlerta(mensagem, tipo) {
        customAlert.textContent = mensagem;
        customAlert.className = ""; 
        
        if (tipo === "sucesso") {
            customAlert.classList.add("alert-success");
        } else {
            customAlert.classList.add("alert-error");
        }
        
    
        customAlert.scrollIntoView({ behavior: 'smooth' });
    }

   
    form.addEventListener("submit", function (evento) {

        evento.preventDefault();

        
        const nomeTutor = document.getElementById("nome-tutor").value.trim();
        const telefone = inputTelefone.value.trim();
        const nomePet = document.getElementById("nome-pet").value.trim();
        const racaPet = document.getElementById("raca-pet").value.trim();
        const dataEscolhida = inputData.value;
        const servicoSelecionado = document.getElementById("selecao-servico").value;

   
        if (!nomeTutor || !telefone || !nomePet || !racaPet || !dataEscolhida || !servicoSelecionado) {
            exibirAlerta("Por favor, preencha todos os campos do formulário para prosseguir.", "erro");
            return;
        }

  
        if (telefone.length < 14) {
            exibirAlerta("Por favor, insira um número de telefone válido com o DDD.", "erro");
            return;
        }

        const mensagemSucesso = `Agendamento solicitado com sucesso para o [${nomePet}]!`;
        exibirAlerta(mensagemSucesso, "sucesso");

        form.reset();
        configurarDataMinima(); 
    });
});