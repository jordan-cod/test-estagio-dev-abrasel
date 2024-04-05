import fs from 'fs';
import path from 'path';

const ProjetosFilePath = path.join(process.cwd(), 'src/data/projetos.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(ProjetosFilePath, 'utf8');
      const projetos = JSON.parse(data);
      res.status(200).json(projetos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter projetos.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
