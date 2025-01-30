import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Button, Text } from 'react-native';

const ExportPdfScreen = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Callback para atualizar o progresso do download
  const callback = (downloadProgress) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  // Função para gerar e salvar o PDF
  const gerarPdf = async () => {
    try {
      const pdfUri = FileSystem.documentDirectory + 'meu_pdf.pdf';
      const pdfBytes = await gerarPdfBytes();  // Sua função para gerar o PDF em bytes

      // Salvando o PDF no sistema de arquivos
      await FileSystem.writeAsStringAsync(pdfUri, pdfBytes, { encoding: FileSystem.EncodingType.Base64 });
      console.log('PDF gerado e salvo em', pdfUri);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
    }
  };

  // Função para baixar o PDF
  const downloadPdf = async () => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        'URL_DO_SEU_PDF',  // URL para o PDF
        FileSystem.documentDirectory + 'meu_pdf_baixado.pdf',
        {},
        callback
      );

      setIsDownloading(true);
      const { uri } = await downloadResumable.downloadAsync();
      console.log('PDF baixado com sucesso para', uri);
      setIsDownloading(false);
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <Button title="Gerar PDF" onPress={gerarPdf} />
      <Button title="Baixar PDF" onPress={downloadPdf} />
      {isDownloading && <Text>Progresso: {(downloadProgress * 100).toFixed(2)}%</Text>}
    </div>
  );
};

export default ExportPdfScreen;
