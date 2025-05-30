export declare class CreateCorporationDto {
    cnpj: string;
    razao_social: string;
    natureza_juridica: string;
    nome_fantasia: string;
    data_inicio_atividade: string;
    cnae_fiscal_principal: string;
    telefone: string;
    email: string;
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    localizacao: string;
    tipo: 'T' | 'P';
    tags: string;
    logo_url: string;
    logo: Buffer;
}
