import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'videoTime' })
export class VideoTimePipe implements PipeTransform {

    transform(value: number, args: string[]): string {
        let hours = Math.floor(value / 3600);
        let minutes = Math.floor(value / 60) % 60;
        let seconds = Math.floor(value) % 60;
        let minutesText: string;
        let secondsText: string;

        minutesText = (minutes < 10 ? '0' : '') + minutes;
        secondsText = (seconds < 10 ? '0' : '') + seconds;

        return hours + ':' + minutesText + ':' + secondsText;
    }

}