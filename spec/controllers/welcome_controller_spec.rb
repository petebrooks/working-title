require 'rails_helper'

describe WelcomeController do
	describe '#index' do
		it 'should render the welcome page' do
			get :index
			expect(response.status).to eq 200
		end
	end
end
