<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JobResource\Pages;
use App\Models\Job;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\DateTimeColumn; 

class JobResource extends Resource
{
    protected static ?string $model = Job::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('job_title')
                    ->label('Job Title')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Enter the title of the job position'),

                TextArea::make('description')
                    ->label('Description')
                    ->required()
                    ->helperText('Provide a detailed description of the job responsibilities'),

                TextArea::make('requirements')
                    ->label('Requirements')
                    ->required()
                    ->helperText('List the qualifications or skills required for the job'),

                TextInput::make('location')
                    ->label('Location')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Enter the job location'),

                DatePicker::make('date_posted')
                    ->label('Date Posted')
                    ->required()
                    ->default(now())
                    ->helperText('The date the job was posted'),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive',
                    ])
                    ->required()
                    ->default('active')
                    ->helperText('Select whether the job is active or inactive'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('job_id')
                    ->label('Job ID')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                TextColumn::make('job_title')
                    ->label('Job Title')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                TextColumn::make('location')
                    ->label('Location')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                DateTimeColumn::make('date_posted') // Updated this to DateTimeColumn for date formatting
                    ->label('Date Posted')
                    ->sortable()
                    ->alignCenter()
                    ->format('F j, Y'), // Custom date format

                TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),
            ])
            ->filters([
                // Add any necessary filters here (e.g., by status)
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'index' => Pages\ListJobs::route('/'),
            'create' => Pages\CreateJob::route('/create'),
            'edit' => Pages\EditJob::route('/{record}/edit'),
        ];
    }
}
