import {Component, OnInit} from '@angular/core';
import {BaseWorkdayFilter, ReportsService} from '../reports.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {WorkdayJustificationComponent} from '../extra/workday-justification/workday-justification.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importa a biblioteca para criar tabelas automaticamente


export interface Day {
  date: string;
  day: string;
  workdayHours: string;
  drivingHours: string;
  restHours: string;
  lunchHours: string;
  waitingHours: string;
  extraHours: string;
  nightShiftHours: string;
}

export interface HistoricalWorkday {
  week: number;
  evaluatedDays: number;
  workingDays: number;
  nonWorkingDays: number;
  weeklyWorkingHours: string;
  weeklyExtraHours: string;
  days: Day[];
}


@Component({
  selector: 'app-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.css']
})
export class WorkdayComponent implements OnInit {
  isLoading = false;
  workdayRows: any[] = [];
  reportFormat = 'synthetic';

  constructor(
    private reportsService: ReportsService,
    private message: NzMessageService,
    private modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
  }

  formatDateToBrazilian(date) {
    return date.toLocaleDateString('pt-BR');
  }

  adjustHours(hoursString: string): string {
    const parts = hoursString.split(' ');
    
    let totalSeconds = 0;
  
    // Se há dias, converte o número de dias para horas e adiciona aos segundos
    if (parts.length === 2) {
      const days = parseInt(parts[0], 10); // Converte os dias em inteiro
      const timeParts = parts[1].split(':'); // Separa HH:MM:SS
  
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
  
      // Converte tudo para segundos
      totalSeconds += days * 24 * 3600; // Converte dias em segundos
      totalSeconds += hours * 3600; // Converte horas em segundos
      totalSeconds += minutes * 60; // Converte minutos em segundos
      totalSeconds += seconds; // Adiciona os segundos
    } else if (parts.length === 1) {
      // Caso não tenha dias, só processa o valor de HH:MM:SS
      const timeParts = parts[0].split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const seconds = parseInt(timeParts[2], 10);
  
      // Converte tudo para segundos
      totalSeconds += hours * 3600;
      totalSeconds += minutes * 60;
      totalSeconds += seconds;
    }
  
    // Converte totalSeconds de volta para o formato HH:MM:SS
    const adjustedHours = Math.floor(totalSeconds / 3600);
    const adjustedMinutes = Math.floor((totalSeconds % 3600) / 60);
    const adjustedSeconds = totalSeconds % 60;
  
    // Retorna no formato HH:MM:SS
    return `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}:${String(adjustedSeconds).padStart(2, '0')}`;
  }
  



  generateReport(form: BaseWorkdayFilter): void {
    this.isLoading = true;
    const isAnalytic = this.reportFormat === 'analytic';

    const getReport = isAnalytic ?
      this.reportsService.getWorkdayHistoryAnalytical.bind(this.reportsService) :
      this.reportsService.getWorkdayHistorySynthetic.bind(this.reportsService);

    getReport(form).subscribe((workdays) => {

      // this.workdayRows = workdays
      this.workdayRows = isAnalytic ? workdays : this.formatSyntheticReport(workdays);
      this.isLoading = false;
    }, (err) => this.handleError(err, form));
  }















  generatePDF(event): void {
    console.log(event)
    const doc = new jsPDF('landscape'); // Gera o PDF em paisagem
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Posição inicial do cabeçalho
    const headerStartY = 10;
    const logoWidth = 50;
    const logoHeight = 20;
    const divWidth = pageWidth - logoWidth - 20; // Largura da div com base na largura da página menos a largura do logo e margens


    // Função de cabeçalho para cada página
    const header = (data) => {
      // Desenha a div que se assemelha a uma tabela
      doc.setFillColor(255, 255, 255); // Cor de fundo da div (branco)
      doc.rect(10, headerStartY, divWidth, 20, 'F'); // Posição e tamanho da div
  
      // doc.setDrawColor(0, 0, 0); // Cor da borda (preta)
      // doc.rect(10, headerStartY, divWidth, 20); // Desenha a borda ao redor da div
  
      
      // Adiciona texto à div
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold'); // Define a fonte para Helvetica em negrito

      doc.setTextColor(0, 0, 0); // Cor do texto
      doc.text(`Relatório Jornada de ${event.name}`, 50, headerStartY + 12); // Posição do texto na div

      doc.setFont('helvetica', 'normal'); // Fonte normal para o período
      doc.setFontSize(12);
      doc.text(`Periodo de ${event.from} à ${event.to}`, 50, headerStartY + 17); // Posição do texto na div

      // Adiciona o logo da empresa
      const logoUrl = 'assets/images/logo/logogertran.png'; // Substitua pelo caminho do logo
      doc.addImage(logoUrl, 'PNG', 260, headerStartY, logoWidth-25, logoHeight); // Posição e tamanho do logo

      // Linha horizontal após o cabeçalho
      doc.setLineWidth(0.5);
      doc.line(10, headerStartY + 25, pageWidth - 10, headerStartY + 25); // Linha horizontal após o cabeçalho
    };


    const formatDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formatHours = (hoursStr: string): string => {
      // Garante que a string não exceda 8 caracteres
      const truncated = hoursStr.substring(0, 8);

      // Se a string não contiver ":" ou tiver menos de 8 caracteres, complete com zeros
      const [hoursPart = '00', minutesPart = '00', secondsPart = '00'] = truncated.split(':');

      // Formata horas, minutos e segundos com dois dígitos
      const hours = hoursPart.padStart(2, '0');
      const minutes = minutesPart.padStart(2, '0');
      const seconds = secondsPart.padStart(2, '0');

      // Retorna no formato "hh:mm:ss"
      return `${hours}:${minutes}:${seconds}`;
    };



    function convertToDecimal(hoursStr: string): number {
      const [hours, minutes, seconds] = hoursStr.split(':').map(Number);
      return hours + minutes / 60 + seconds / 3600;
    }
    
    function convertToTimeString(decimalHours: number): string {
      const hours = Math.floor(decimalHours);
      const minutes = Math.floor((decimalHours - hours) * 60);
      const seconds = Math.floor(((decimalHours - hours) * 60 - minutes) * 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }



    // Função para formatar data e hora no padrão brasileiro
    function formatDateTime(dateTime: string): string {
      if(dateTime == null)
        return ''
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      };
      return new Date(dateTime).toLocaleString('pt-BR', options);
    }



    // Cabeçalho da tabela
    const headers = [
      ['Data','Entrada' ,'Saida', 'Jornada', 'Direção', 'Refeição', 'Espera', 'Descanso', 'Hora extra', 'Ad. noturno'],
    ];

    // Transformando os dados em formato de tabela
    // const data = this.workdayRows.map(row => [
    //   formatDate(row.date),formatDateTime(row.workdayTime), formatDateTime(row.endOfWorkday) ,formatHours(row.workdayHours), formatHours(row.drivingHours), formatHours(row.lunchHours),
    //   formatHours(row.waitingHours), formatHours(row.restHours), formatHours(row.extraHours), formatHours(row.nightShiftHours)
    // ]);

 // Calcular os totais
 const totals = {
  workdayHours: 0,
  drivingHours: 0,
  lunchHours: 0,
  waitingHours: 0,
  restHours: 0,
  extraHours: 0,
  nightShiftHours: 0,
};

this.workdayRows.forEach(row => {
  totals.workdayHours += convertToDecimal(row.workdayHours);
  totals.drivingHours += convertToDecimal(row.drivingHours);
  totals.lunchHours += convertToDecimal(row.lunchHours);
  totals.waitingHours += convertToDecimal(row.waitingHours);
  totals.restHours += convertToDecimal(row.restHours);
  totals.extraHours += convertToDecimal(row.extraHours);
  totals.nightShiftHours += convertToDecimal(row.nightShiftHours);
});





// Adicionar a linha de totais na última linha da tabela
const data = this.workdayRows.map(row => {
  const exampleDate = new Date(row.date + 'T00:00:00');

  const formattedDate = this.formatDateToBrazilian(exampleDate);
  return [
    formattedDate, formatDateTime(row.workdayTime), formatDateTime(row.endOfWorkday),
    formatHours(row.workdayHours), formatHours(row.drivingHours), formatHours(row.lunchHours),
    formatHours(row.waitingHours), formatHours(row.restHours), formatHours(row.extraHours), formatHours(row.nightShiftHours)
  ]
});

data.push([
  'Totais', '', '', convertToTimeString(totals.workdayHours),
  convertToTimeString(totals.drivingHours), convertToTimeString(totals.lunchHours),
  convertToTimeString(totals.waitingHours), convertToTimeString(totals.restHours),
  convertToTimeString(totals.extraHours), convertToTimeString(totals.nightShiftHours)
]);


    // Cria a tabela com paginação automática e o cabeçalho em todas as páginas
    const tableData = autoTable(doc, {
      head: headers,
      body: data,
      startY: headerStartY + 30, // Posição inicial da tabela após o cabeçalho e a linha
      theme: 'striped',
      styles: {
        fontSize: 7,
        fontStyle: 'bold',
        lineWidth: 0.5 // Ajusta o espaçamento entre as linhas (reduzido)
      },
      margin: { top: headerStartY + 30 }, // Margem superior para a tabela
      didDrawPage: (data) => {
        header(data);
            // Adiciona o rodapé

        const pageCount = doc.getNumberOfPages() // Obtém o número total de páginas
        // console.log(data.pageNumber)
        // const currentPage = data.table.body.length -1
        // doc.internal.().pageNumber;

        const str = `Página ${pageCount}`; // Texto do rodapé com a numeração da página
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.right, doc.internal.pageSize.getHeight() - 10); // Define a posição do rodapé
  


        //       // Se for a última página, adicione o texto de ciente
        // if (data.pageNumber == pageCount) {
        //   doc.setFontSize(12);
        //   doc.text('Ciente: ____________________________________', 14, pageHeight - 20);
        // }



      },   
    });

    // // Adicionar mais texto depois da tabela
    // const finalY = doc.internal.pageSize.getHeight(); // Pega a posição final Y da tabela
    // doc.setFontSize(12);
    // doc.text("Texto adicional após a tabela", 14, finalY + 10); // Adiciona texto abaixo da tabela
    // doc.text("Mais informações podem ser colocadas aqui.", 14, finalY + 20); // Outro texto abaixo

    // Verifique o número total de páginas após a tabela ser gerada
    const totalPages = doc.getNumberOfPages();

    // Adicione o texto na última página
    doc.setPage(totalPages); // Navegue até a última página
    doc.setFontSize(12);


    const currentDate = new Date();

    const formattedDate = this.formatDate(currentDate);

    doc.text(`Data da emissão: ${formattedDate} - ${event.name}: ____________________________________`, 14, pageHeight - 20);


    // Salva o PDF
    doc.save('relatorio-jornada.pdf');
  }


  formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  handleError(err: any, form: BaseWorkdayFilter): void {
    this.isLoading = false;
    this.message.error('Ocorreu um erro ao gerar o relatório');

    if (err?.error?.extra?.fields?.days_without_events) {
      const daysWithoutEvents = err.error.extra.fields.days_without_events;
      this.modal.create({
        nzTitle: 'Dias sem eventos',
        nzContent: WorkdayJustificationComponent,
        nzWidth: 800,
        nzComponentParams: {
          daysWithoutEvents,
          form,
        },
      });

      return;
    }
  }

  valueChanges(params: BaseWorkdayFilter): void {
    this.reportFormat = params.reportFormat;
  }

  getHistoricalTableRowSpan(workday: HistoricalWorkday): number {
    if (this.isFirstDayOfWeek(workday)) {
      return this.getDaysFromWorkday(workday).length;
    }
  }

  isFirstDayOfWeek(workday: HistoricalWorkday): boolean {
    const days = this.getDaysFromWorkday(workday);

    return days[0] === workday;
  }

  private getDaysFromWorkday(workday: HistoricalWorkday): any[] {
    return this.workdayRows.filter((row) => row.week === workday.week);
  }

  private formatSyntheticReport(workdays: any[]): any[] {
    workdays = workdays.map((workday) => ({
      ...workday,
      workdayHours: this.adjustHours(workday.workdayHours),
      drivingHours: this.adjustHours(workday.drivingHours),
      restHours: this.adjustHours(workday.restHours),
      lunchHours: this.adjustHours(workday.lunchHours),
      waitingHours: this.adjustHours(workday.waitingHours),
      extraHours: this.adjustHours(workday.extraHours),
      nightShiftHours: this.adjustHours(workday.nightShiftHours),
    }));
    return workdays
    return workdays.flatMap((row) =>
      row.days.map((day) => ({
        ...day,
        ...row,
      }))
    );
  }
}
