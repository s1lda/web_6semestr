import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

// Лабораторная работа 3: Добавлена стратегия OnPush 
// Лабораторная работа 4: Добавлено управление подписками
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero$: Observable<Hero>;
  heroForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.heroForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      power: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      level: [1, [Validators.required, Validators.min(1), Validators.max(99)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      birthDate: ['', Validators.required]
    });

    // Инициализируем hero$ в конструкторе
    this.hero$ = this.route.paramMap.pipe(
      map(params => parseInt(params.get('id')!, 10)),
      switchMap(id => this.heroService.getHero(id)),
      takeUntil(this.destroy$)
    );
  }

  ngOnInit(): void {
    // Подписываемся на hero$ для обновления формы
    this.hero$.subscribe(hero => {
      this.heroForm.patchValue(hero);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.heroForm.valid) {
      const updatedHero = this.heroForm.value;
      this.heroService.updateHero(updatedHero)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.goBack());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
