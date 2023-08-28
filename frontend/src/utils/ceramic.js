//ceramic.js - Ceramic SDK methods
import { CeramicClient } from '@ceramicnetwork/http-client';

export async function createDocument(accountId) {
  const ceramic = new CeramicClient('https://ceramic.network');
  const document = await ceramic.createDocument('tile:json', {
    controllers: [accountId],
  });
  return document.id.toString();
}

export async function getDocument(documentId) {
  const ceramic = new CeramicClient('https://ceramic.network');
  const document = await ceramic.loadDocument(documentId);
  return document.content;
}
