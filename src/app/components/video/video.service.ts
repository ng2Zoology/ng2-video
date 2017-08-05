import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/find'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'

import { VideoInterface } from './video.interface'

const VIDEO_API: string = './db.json'

@Injectable()
export class VideoService {

    constructor(private http: Http) {

    }

    getVideo(id: number): Observable<VideoInterface> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this.http
            .get(VIDEO_API, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json()))
    }

}