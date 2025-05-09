<?php

namespace App\Filament\Resources\InterviewsResource\Pages;

use App\Filament\Resources\InterviewsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditInterviews extends EditRecord
{
    protected static string $resource = InterviewsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
