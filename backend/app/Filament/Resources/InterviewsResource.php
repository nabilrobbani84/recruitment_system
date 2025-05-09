<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InterviewsResource\Pages;
use App\Models\Interview;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Tables\Columns\TextColumn;

class InterviewsResource extends Resource
{
    protected static ?string $model = Interview::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('application_id')
                    ->label('Application ID')
                    ->required(),

                DatePicker::make('interview_date')
                    ->label('Interview Date')
                    ->required(),

                TimePicker::make('interview_time')
                    ->label('Interview Time')
                    ->required(),

                TextInput::make('interview_location')
                    ->label('Interview Location')
                    ->required(),

                TextArea::make('status')
                    ->label('Status')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('application_id')
                    ->label('Application ID')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('interview_date')
                    ->label('Interview Date')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('interview_time')
                    ->label('Interview Time')
                    ->sortable(),

                TextColumn::make('interview_location')
                    ->label('Location')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                // Add filters as needed
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Define relations if needed
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInterviews::route('/'),
            'create' => Pages\CreateInterviews::route('/create'),
            'edit' => Pages\EditInterviews::route('/{record}/edit'),
        ];
    }
}
