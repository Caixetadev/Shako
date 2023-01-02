const adicionarGostosPessoais = async ({gostos}, knex, ws) => {
    // Conecte-se ao banco de dados
    const connection = knex.initialize({
      host: 'localhost',
      user: 'seu_usuario',
      password: 'sua_senha',
      database: 'nome_do_seu_banco_de_dados',
    });
  
    // Inserir os gostos pessoais na tabela 'gostos_pessoais'
    connection('gostos_pessoais').insert(gostos)
      .then(() => {
        console.log('Gostos pessoais adicionados com sucesso!');
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Feche a conexão com o banco de dados
    connection.destroy();
}

module.exports = {adicionarGostosPessoais}