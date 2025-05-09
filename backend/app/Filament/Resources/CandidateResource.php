<?php
// app/Filament/Resources/CandidateResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\CandidateResource\Pages;
use App\Models\Candidate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn; // Correctly using ImageColumn
use Illuminate\Support\Facades\Storage; // For file upload handling

class CandidateResource extends Resource
{
    protected static ?string $model = Candidate::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('user_id')
                    ->label('User ID')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Enter the user ID associated with this candidate'),

                TextArea::make('address')
                    ->label('Address')
                    ->required()
                    ->maxLength(255)
                    ->helperText('Enter the candidate’s address'),

                TextInput::make('phone_number')
                    ->label('Phone Number')
                    ->required()
                    ->maxLength(15)
                    ->helperText('Enter the candidate’s phone number'),

                FileUpload::make('cv')
                    ->label('CV (PDF or DOCX)')
                    ->nullable()
                    ->acceptedFileTypes(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
                    ->helperText('Upload the candidate’s CV in PDF or DOCX format')
                    ->disk('public') // Save the file to the public disk
                    ->directory('cv'), // Store in the "cv" folder
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('candidate_id')
                    ->label('Candidate ID')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                TextColumn::make('user_id')
                    ->label('User ID')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                TextColumn::make('address')
                    ->label('Address')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                TextColumn::make('phone_number')
                    ->label('Phone Number')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),

                // Correctly using ImageColumn for the CV
                ImageColumn::make('cv')
                    ->label('CV')
                    ->sortable()
                    ->alignCenter(), // This automatically renders the image URL

                TextColumn::make('status')
                    ->label('Status')
                    ->sortable()
                    ->searchable()
                    ->alignCenter(),
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
            'index' => Pages\ListCandidates::route('/'),
            'create' => Pages\CreateCandidate::route('/create'),
            'edit' => Pages\EditCandidate::route('/{record}/edit'),
        ];
    }
}
