// src/common/types/cnpj.type.ts
export type CnpjResponse = {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  porte: {
    id: string;
    descricao: string;
  };
  natureza_juridica: {
    id: string;
    descricao: string;
  };
  simples: {
    simples: 'Sim' | 'Não';
    data_opcao_simples: string | null;
    mei: 'Sim' | 'Não';
    data_opcao_mei: string | null;
  };
  estabelecimento: {
    cnpj: string;
    tipo: string;
    nome_fantasia: string | null;
    situacao_cadastral: string;
    data_situacao_cadastral: string;
    data_inicio_atividade: string;
    atividade_principal: {
      id: string;
      descricao: string;
    };
    atividades_secundarias: Array<{
      id: string;
      descricao: string;
    }>;
    tipo_logradouro: string;
    logradouro: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    ddd1: string | null;
    telefone1: string | null;
    email: string | null;
    cidade: {
      nome: string;
      ibge_id: number;
    };
    estado: {
      nome: string;
      sigla: string;
    };
    pais: {
      nome: string;
      iso2: string;
    };
  };
};
