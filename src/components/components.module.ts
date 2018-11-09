import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion';
import { HeaderMenuComponent } from './header-menu/header-menu';
@NgModule({
	declarations: [AccordionComponent,
    HeaderMenuComponent],
	imports: [],
	exports: [AccordionComponent,
    HeaderMenuComponent]
})
export class ComponentsModule {}
