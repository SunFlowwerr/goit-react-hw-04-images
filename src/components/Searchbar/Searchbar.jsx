import { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    searchString: '',
  };

  handleChange = e => {
    this.setState({ searchString: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchString.trim() === '') {
      toast.error('Enter search data!');
      return;
    }

    this.props.onSubmit(this.state.searchString);
    this.setState({ searchString: '' });
  };

  render() {
    return (
      <header
        style={{
          top: 0,
          left: 0,
          position: 'sticky',
          zIndex: 1100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '64px',
          paddingRight: '24px',
          paddingLeft: '24px',
          paddingTop: '12px',
          paddingBottom: '12px',
          color: '#fff',
          backgroundColor: '#3f51b5',
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
        }}
      >
        <form
          class="form"
          onSubmit={this.handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <button
            type="submit"
            class="button"
            style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '0',
              backgroundImage:
                "url('https://image.flaticon.com/icons/svg/149/149852.svg')",
              backgroundSize: '40%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              opacity: '0.6',
              transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <span
              class="button-label"
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                clipPath: 'inset(50%)',
                border: '0',
              }}
            ></span>
            <FaSearch style={{ width: '28px', height: '28px' }}></FaSearch>
          </button>
          <input
            style={{
              display: 'inline-block',
              width: '100%',
              font: 'inherit',
              fontSize: '20px',
              border: 'none',
              outline: 'none',
              paddingLeft: '4px',
              paddingRight: '4px',
            }}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchString}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

<style>
  {`
  .SearchForm-input::placeholder {
    font: inherit;
    font-size: 18px;
  }
  `}
</style>;
