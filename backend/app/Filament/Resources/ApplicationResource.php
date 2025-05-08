<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApplicationResource\Pages;
use App\Filament\Resources\ApplicationResource\RelationManagers;
use App\Models\Application;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\DateColumn;

class ApplicationResource extends Resource
{
    protected static ?string $model = Application::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Applications';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('candidate_id')
                    ->label('Candidate ID')
                    ->required()
                    ->placeholder('Enter candidate ID')
                    ->maxLength(255),
                
                Select::make('job_id')
                    ->label('Job Position')
                    ->options([
                        '1' => 'Software Developer',
                        '2' => 'Marketing Specialist',
                        '3' => 'HR Manager',
                        '4' => 'UI/UX Designer',
                    ])
                    ->required()
                    ->placeholder('Select job position'),

                DatePicker::make('application_date')
                    ->label('Application Date')
                    ->required()
                    ->default(now()),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ])
                    ->required()
                    ->default('pending'),
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
                
                TextColumn::make('candidate_id')
                    ->label('Candidate ID')
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('job_id')
                    ->label('Job Position')
                    ->sortable()
                    ->searchable(),
                
                DateColumn::make('application_date')
                    ->label('Application Date')
                    ->sortable(),
                
                TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                // Filters can be added here if necessary
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(), // You can add a View Action
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
            // You can define relations here if needed, for example, with candidates or jobs.
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListApplications::route('/'),
            'create' => Pages\CreateApplication::route('/create'),
            'edit' => Pages\EditApplication::route('/{record}/edit'),
        ];
    }
}
